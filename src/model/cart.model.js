'use strict'

const { Schema, default: mongoose } = require("mongoose");
const { type } = require("os");

const DOCUMENT_NAME = 'Cart';
const COLLECTION_NAME = 'carts'

const cartSchema = new Schema({
    cart_state: {
        type: String, require: true,
        enum: ['active', 'complete', 'faid', 'pending'],
        default: 'active'
    },
    cart_products: {
        type: Array,
        require: true,
        default: []
    },
    cart_countProduct: {
        type: Number,
        require: true
    },
    cart_userID: {
        type: String,
        require: true
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = mongoose.model(DOCUMENT_NAME, cartSchema);