'use strict';

const shopModel = require("../model/shop.model");

class ShopService {
    static async findByEmail({ email, select = { email: 1, password: 1, status: 1, roles: 1, verify: 1 } }) {
        try {
            // 
            const result = await shopModel.findOne({ email }).select(select).lean();
            return result;
        } catch (error) {
            console.error('Error finding by email:', error);
            throw error;
        }
    }
}

module.exports = ShopService;
