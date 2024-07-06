// !dmbgum => Create Fast Model

const { mongoose, Schema } = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const DOCUMENT_NAME = 'apiKey'
const COLLECTION_NAME = 'apikeys'
var apiKeySchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: Boolean,
        default: true
    },
    permissions: {
        type: [String],
        require: true,
        enum: ['0000', '1111', '2222']
    }
}, { timestamps: true, collection: COLLECTION_NAME });

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, apiKeySchema);