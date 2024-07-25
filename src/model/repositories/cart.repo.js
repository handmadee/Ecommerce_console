'use strict'

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


const findDeleteCart = async (query) => await cartModel.findOneAndDelete(query);


module.exports = { findCart, createCart, updateCart, findDeleteCart };

