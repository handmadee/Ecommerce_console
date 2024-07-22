'use strict'
const { Types, model, default: mongoose, Schema } = require("mongoose");

// Declare the Schema of the Mongo model
const DOCUMENT_NAME = 'Inventorie';
const COLLECTION_NAME = 'inventories'; // Thường là chữ thường

const InventorieSchema = new Schema({
    inven_prodcutId: { type: Schema.Types.ObjectId, ref: 'Product' },
    inven_location: {
        type: String,
        default: 'unKnow'
    },
    inven_stock: { type: Number, require: true },
    inven_shopId: {
        type: Schema.Types.ObjectId,
        ref: 'Shop'
    },
    inven_reservations: { type: Array, default: [] }
}, { timestamps: true, collection: COLLECTION_NAME });



module.exports = mongoose.model(DOCUMENT_NAME, InventorieSchema);