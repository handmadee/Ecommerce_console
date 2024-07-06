// !dmbgum => Create Fast Model

const { mongoose, Schema } = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const DOCUMENT_NAME = 'keyToken'
const COLLECTION_NAME = 'keyTokens'
var userSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Shop'
    },
    publicKey: {
        type: String,
        require: true
    },
    privateKey: {
        type: String,
        require: true
    },
    refreshTokenUsed: {
        type: Array,
        default: [String],
        require: true
    },
    refreshToken: {
        type: String,
        require: true
    }
}, { timestamps: true, collection: COLLECTION_NAME });

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, userSchema);