'use strict'


const { findCart, createCart, updateCart, findDeleteCart } = require("../model/repositories/cart.repo");
const { findProduct } = require("../model/repositories/product.repo");
const { convertObjectId } = require("../utils");
const { NotFoundError, ForbiddenError, NOT_FOUND } = require('./../core/error.response');


class CartService {

    /**
     *
     *
     * @static
     * @param {*} { userId, product = {} }
     * @return {*} 
     * @memberof CartService
     */
    static async updateProductCart({ userID, product = {} }) {
        try {
            const { productId, quantity } = product;
            if (!userID || !productId || typeof quantity !== 'number') {
                throw new Error('Invalid input');
            }
            const query = {
                cart_userID: convertObjectId(userID),
                'cart_products.productId': productId,
                cart_state: 'active'
            };

            const update = {
                $inc: {
                    'cart_products.$.quantity': +quantity
                }
            };

            const options = {
                new: true
            };

            const updateC = await updateCart(query, update, options);
            if (!updateC) {
                return await updateCart({
                    cart_userID: convertObjectId(userID),
                    cart_state: 'active'
                }, {
                    $push: {
                        'cart_products': product
                    }
                }, options);
            }
            return updateC;
        } catch (error) {
            console.error("Error updating product cart:", error);
            throw error;
        }
    }


    /**
     *
     *
     * @static
     * @param {*} { userID, products = {} }
     * @return {*} 
     * @memberof CartService
     */
    static async addToCart({ userID, products = {} }) {
        console.log({
            userID,
            products
        })
        const foundCart = await findCart({
            cart_userID: convertObjectId(userID)
        });
        if (!foundCart) {
            return await createCart({
                cart_products: [products],
                cart_state: 'active',
                cart_userID: convertObjectId(userID)
            });
        }
        // exits cart
        if (!foundCart.cart_products.length) {
            const query = {
                _id: convertObjectId(foundCart._id),
                cart_userID: convertObjectId(userID),
                cart_state: 'active'
            };
            const update = {
                cart_products: [products]
            }
            const option = {
                upsert: true,
                new: true
            }
            return await updateCart(query, update, option);
        }
        // cart by product exits 
        const newCart = await CartService.updateProductCart({
            userID,
            product: products
        });
        return newCart;
    }


    /**
     *
     *
     * @static
     * @param {*} { userId, product = {
     *  shop_orders_ids: [
     * {
     * shopId,
     * itemProduct: {
     * quanlity ,
     * price,
     * oldQuantity
     * price,
     * productId
     * }
     * }
     * ]
     * } }
     * @return {*} 
     * @memberof CartService
     */
    static async addToCartV2({ userId, product = {} }) {
        const {
            productId,
            oldQuantity,
            quantity
        } = product.shop_orders_ids[0].itemProduct[0];
        console.log(product.shop_orders_ids[0].itemProduct[0])
        const foundProduct = await findProduct({
            product_id: convertObjectId(productId),
            unSelect: ['__v']
        });
        if (!foundProduct) throw new NotFoundError(`
            Product not found`);
        // compare 
        if (!product.shop_orders_ids[0].shopId == foundProduct.product_shop) {
            throw new ForbiddenError('The product does not belong to the shop !');
        }
        if (quantity == 0) return await CartService.deleteProductInCart({
            userId,
            product
        });
        // if foundCart ton tai tang so luong san pham trong gio hang findOneandUpdate
        const newCart = await updateCart({
            cart_userID: userId,
            'cart_products.productId': productId,
        },
            {
                $inc: {
                    'cart_products.$.quantity': quantity - oldQuantity
                }
            },
            {
                new: true
            }
        );
        // update success => 200
        return newCart;
    }

    static async removeProductInCart({
        userId, product = {}
    }) {
        const {
            productId,
        } = product;
        const newCart = await updateCart({
            cart_userID: userId,
            'cart_products.productId': productId,
            cart_state: 'active'
        },
            {
                $pull: {
                    cart_products: { productId: productId }
                }
            },
            {
                new: true
            }
        );
        return newCart;
    }
    static async clearProductInCart({
        userId
    }) {
        return await findDeleteCart({
            cart_userID: userId,
        });

    }
    static async getAllProductInCart({ userId }) {
        const cart = await findCart({
            cart_userID: userId
        });
        if (!cart) throw new NOT_FOUND('Cart notfound !');
        return cart.cart_products;
    }
}

module.exports = CartService;