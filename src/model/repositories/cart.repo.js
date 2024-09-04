'use strict'

const { convertObjectId } = require("../../utils");
const cartModel = require("../cart.model")



const findCart = async (query) => {
    return await cartModel.findOne(query).lean();
}
const createCart = async (payload) => await cartModel.create(payload);

const updateCart = (query, update, options) => {
    console.log({
        query, update, options
    })
    return cartModel.findOneAndUpdate(query, update, options);
}


async function removeProductInCartbyOrder(userId, products) {
    // Lấy giỏ hàng hiện tại của người dùng
    const cart = await cartModel.findOne({
        cart_userID: convertObjectId(userId),
        cart_state: 'active'
    });

    if (!cart) {
        throw new Error('Cart not found');
    }

    const updates = products.map(({ productId, quantity }) => {
        const productInCart = cart.cart_products.find(p => p.productId.toString() === productId);

        if (!productInCart) {
            return Promise.reject(new Error(`Product ${productId} not found in cart`));
        }

        // Tạo điều kiện cập nhật
        const update = productInCart.quantity - quantity <= 0
            ? { $pull: { cart_products: { productId } } }
            : { $inc: { 'cart_products.$.quantity': -quantity } };

        // Thực hiện cập nhật
        return cartModel.findOneAndUpdate(
            {
                cart_userID: convertObjectId(userId),
                'cart_products.productId': productId,
                cart_state: 'active'
            },
            update
        );
    });

    // Chờ tất cả các thao tác cập nhật hoàn thành
    return Promise.all(updates);
}


const findDeleteCart = async (query) => await cartModel.findOneAndDelete(query);


module.exports = { findCart, createCart, updateCart, findDeleteCart, removeProductInCartbyOrder };

