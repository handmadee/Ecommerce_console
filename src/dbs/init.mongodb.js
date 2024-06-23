
// Product 
'use strict';
const mongoose = require('mongoose');
const config = require('../config/config.mongodb');

class Database {
    constructor() {
        this._connect();
    }

    async _connect() {
        try {
            await mongoose.connect(config.db.host, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log("Connected to MongoDB successfully!");
        } catch (error) {
            console.error("Error connecting to MongoDB:", error);
            process.exit(1);
        }
    }

    async disconnect() {
        try {
            await mongoose.disconnect();
            console.log("Disconnected from MongoDB.");
        } catch (error) {
            console.error("Error disconnecting from MongoDB:", error);
        }
    }
}

module.exports = new Database();