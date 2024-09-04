'use strict'

const mongoose = require("mongoose");
const { Schema } = mongoose;

const DOCUMENT_NAME = 'Order';
const COLLECTION_NAME = 'orders';

const orderSchema = new Schema({
    order_userId: {
        type: String,
        required: true
    },
    /*
     totalPrice 
     totalApplydiscount
     freeship
    */
    order_checkout: {
        type: Object,
        default: {}
    },
    /*
    {
    street,
    city,
    state,
    country
    }
    */
    order_shipping: {
        type: Object,
        default: {}
    },
    /*
      paymentMethod: { type: String, required: true }, // Ví dụ: "credit_card", "paypal"
      amount: { type: Number, required: true },       // Số tiền thanh toán
      currency: { type: String, required: true },     // Đơn vị tiền tệ, ví dụ: "USD", "EUR"
      transactionId: { type: String },                // ID giao dịch từ cổng thanh toán
      paymentDate: { type: Date, default: Date.now }, // Ngày thanh toán
      status: { type: String, enum: ['pending', 'completed', 'failed'], required: true } // Trạng thái thanh toán
    */
    order_payment: {
        type: Object,
        default: {}
    },
    order_products: {
        type: Array,
        required: true
    },
    order_trackingNumber: {
        type: String,
        default: '#00001817251'
    },
    order_status: {
        type: String,
        enum: ['pending', 'confirmed', 'shipped', 'cancelled', 'delivered'],
        default: 'pending'
    }
}, {
    collection: COLLECTION_NAME,
    timestamps: true
});

module.exports = mongoose.model(DOCUMENT_NAME, orderSchema);
