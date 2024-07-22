'use strict'

const mongoose = require('mongoose');
const { Schema } = mongoose;

const DOCUMENT_NAME = 'Discount';
const COLLECTION_NAME = 'discounts';

const discountSchema = new Schema({
    discount_name: { type: String, required: true },
    discount_description: { type: String, required: true },
    discount_type: { type: String, default: 'fixed_amount' }, // 'percentage'
    discount_value: { type: Number, required: true }, // 10.000 or 10
    discount_max_value: { type: Number, required: true }, // max value
    discount_code: { type: String, required: true }, // discount code
    discount_start_date: { type: Date, required: true }, // start date
    discount_end_date: { type: Date, required: true }, // end date
    discount_max_user: { type: Number, required: true }, // number of remaining discounts
    discount_max_count: { type: Number, required: true }, // number of discounts used
    discount_users_used: { type: [Schema.Types.ObjectId], default: [] }, // who has used this discount
    discount_max_users_per_used: { type: Number, required: true }, // number of times a user can use
    discount_min_order_value: { type: Number, required: true },
    discount_shopID: { type: Schema.Types.ObjectId, ref: 'Shop' },
    discount_is_active: { type: Boolean, default: true }, // is the discount active
    discount_applies_to: { type: String, required: true, enum: ['all', 'specific'] }, // apply discount
    discount_product_ids: { type: [Schema.Types.ObjectId], default: [] } // products eligible for discount
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

// Export the model 
module.exports = mongoose.model(DOCUMENT_NAME, discountSchema);
