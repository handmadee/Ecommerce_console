'use strict'

const { BadRequestError } = require("../core/error.response");
const orderModel = require("../model/order.model");
const { findCart, removeProductInCartbyOrder } = require("../model/repositories/cart.repo");
const { findCodeByDiscount } = require("../model/repositories/discount.repo");
const { findProduct, listProducts } = require("../model/repositories/product.repo");
const { convertObjectId } = require("../utils");
const CartService = require("./cart.service");
const DiscountService = require("./discount.service");
const { acquireLock } = require("./redis.service");

class orderService {
    static async reviewOrder({
        cartId, userId, shop_order_ids = []
    }) {
        const checkout_order_ids = {
            totalPrice: 0,
            feeship: 0,
            totalDiscount: 0,
            totalProduct: 0
        }
        let checkout_order_news_ids = [];
        for (let i = 0; i < shop_order_ids.length; i++) {
            const { shop_discount, itemProducts, shopId } = shop_order_ids[i];
            const foundCart = await findCart({
                _id: convertObjectId(cartId),
                cart_userID: convertObjectId(userId),
                cart_state: 'active'
            });
            if (!foundCart) throw new BadRequestError('foundCart not found !');
            const arrProduct = await listProducts(itemProducts, shopId);
            console.log({
                arrProduct
            })
            if (!arrProduct[0]) throw new BadRequestError('order wrong !');
            const checkOutPrice = arrProduct.reduce((total, item) => {
                return total += (item.price * item.quantity);
            }, 0);
            checkout_order_ids.totalPrice = checkOutPrice;
            const itemCheckout = {
                shopId,
                shop_discount,
                priceRaw: checkOutPrice,
                item_product: arrProduct,
                totalDiscount: 0,
                priceApplyDiscount: 0
            }
            if (shop_discount.length > 0) {
                for (const item of shop_discount) {
                    const { totalPrice, discount } = await DiscountService.getDiscountAmount({
                        code: item.codeId,
                        userId: userId,
                        shopId: item.shopId,
                        products: arrProduct
                    });

                    itemCheckout.totalDiscount += discount;
                }
            }
            checkout_order_ids.totalDiscount += itemCheckout.totalDiscount;
            itemCheckout.priceApplyDiscount = itemCheckout.priceRaw - itemCheckout.totalDiscount;
            checkout_order_news_ids.push(itemCheckout);
        }
        console.log(
            checkout_order_ids.totalDiscount
        )
        checkout_order_ids.totalProduct = checkout_order_ids.totalPrice - checkout_order_ids.totalDiscount;
        return {
            cartId, userId,
            checkout_order_ids,
            checkout_order_news_ids
        }
    }
    static async handlerOrder({
        userId,
        cartId,
        order_shipping,
        order_payment,
        order_status = 'pending',
        shop_order_ids = []
    }) {

        // check shop 
        // tinh tien 
        // tru trong kho 
        // castout success
        const foundCart = await findCart({
            cart_userID: convertObjectId(userId),
            _id: convertObjectId(cartId),
            cart_state: 'active'
        });
        if (!foundCart) throw new BadRequestError('Cart notfound !!');
        const { checkout_order_news_ids } = await orderService.reviewOrder({
            cartId,
            userId,
            shop_order_ids
        });
        if (!checkout_order_news_ids.length) throw new BadRequestError('Checkout not found ! ');
        // let products = checkout_order_news_ids.flatMap(itemOrder => itemOrder.map(item => item.item_product));

        let products = checkout_order_news_ids.flatMap(itemOrder => itemOrder.item_product)


        const acquireProduct = [];
        // remove product in inventory 
        for (let i = 0; i < products.length; i++) {
            const { productId, quantity } = products[i];
            const keyLock = await acquireLock(productId, quantity, cartId);
            acquireProduct.push(keyLock ? true : false);
            if (keyLock) await releaseLock(keyLock);
        }
        // if co 1 san pham loi thi se thong bao 
        if (acquireProduct.includes(false)) throw new BadRequestError('Some products have been updates , in please retry ');
        // create Order 
        const payload = {
            order_userId: userId,
            order_shipping,
            order_payment,
            order_products: products,
            order_trackingNumber,
            order_status
        }
        const newOrder = await orderModel.create({ payload });
        if (!newOrder) {
            throw new BadRequestError('An error occurred with the order')
        }
        // delete product in Cart
        await removeProductInCartbyOrder(userId, products);
        return newOrder;
    }
}



module.exports = orderService;
