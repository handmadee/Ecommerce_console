const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Declare the Schema of the Mongo model
const DOCUMENT_NAME = 'Shop';
const COLLECTION_NAME = 'shops'; // Thường là chữ thường

var shopSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'notActive'],
        default: 'notActive'
    },
    verify: {
        type: Boolean,
        default: false
    },
    roles: {
        type: Array,
        default: []
    }
}, { timestamps: true, collection: COLLECTION_NAME });

// Export the model
module.exports = mongoose.model(DOCUMENT_NAME, shopSchema);
