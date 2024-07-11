'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('slugify');
// Declare the Schema of the Mongo model
const DOCUMENT_NAME = 'Product';
const COLLECTION_NAME = 'products'; // Thường là chữ thường

const productSchema = new Schema({
    product_name: { type: String, required: true },
    product_thumb: { type: String, required: true },
    product_description: { type: String, required: false },
    product_price: { type: Number, required: true },
    product_quantity: { type: Number, required: true },
    product_type: {
        type: String, required: true, enum: [
            'Electronics', 'Clothing', 'Furniture'
        ]
    },
    product_shop: {
        type: Schema.Types.ObjectId, ref: 'Shop'
    },
    product_attributes: {
        type: Schema.Types.Mixed, required: true
    },
    // more 
    product_slug: String,
    product_rattingAverange: {
        type: Number,
        default: 4.5,
        min: [1, 'Ratting must be above 1.0'],
        max: [5, 'Ratting must be above 5.0'],
        set: (val) => Math.round(val * 10) / 10
    },
    product_variations: {
        type: Array,
        default: []
    },
    isDraft: {
        type: Boolean,
        default: true,
        index: true,
        select: false
    },
    isPublish: {
        type: Boolean,
        default: false,
        index: true,
        select: false
    }
}, { timestamps: true, collection: COLLECTION_NAME });

// đánh index cho product full text searcH


// 1 midđleware: trước khi save 
productSchema.pre('save', function (next) {
    this.product_slug = slugify(this.product_name, { lower: true });
    next();
})


const clothingSchema = new Schema({
    brand: { type: String, required: true },
    size: { type: String, required: false },
    material: { type: String, required: false },
    product_shop: {
        type: Schema.Types.ObjectId, ref: 'Shop'
    },
}, {
    colcllection: 'clothes',
    timestamps: true
});

// Define the schema for product type = electronics
const electronicSchema = new Schema({
    manufacturer: { type: String, required: true },
    model: { type: String, required: false },
    color: { type: String, required: false },
    product_shop: {
        type: Schema.Types.ObjectId, ref: 'Shop'
    }
}, {
    collection: 'electronics',
    timestamps: true
});


// Define the schema for product type = Furntiture
const furntitureSchema = new Schema({
    brand: { type: String, required: true },
    size: { type: String, required: false },
    material: { type: String, required: false },
    product_shop: {
        type: Schema.Types.ObjectId, ref: 'Shop'
    }
}, {
    collection: 'furntitures',
    timestamps: true
});

// Export the models
module.exports = {
    product: mongoose.model(DOCUMENT_NAME, productSchema),
    electronic: mongoose.model('Electronic', electronicSchema),
    clothing: mongoose.model('Clothing', clothingSchema),
    furntiture: mongoose.model('Furntiture', furntitureSchema),
};
