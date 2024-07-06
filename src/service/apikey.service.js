'use strict'

const apiKeyModel = require("../model/apiKey.model")

class ApiKeyService {
    // static createApiKey = async () => {
    //     return await apiKeyModel.create({
    //         key
    //     })
    // }

    // @find byID
    static findByID = async (key) => {
        const objKey = await apiKeyModel.findOne({
            key, status: true
        });
        return objKey;
    }


}

module.exports = ApiKeyService;
