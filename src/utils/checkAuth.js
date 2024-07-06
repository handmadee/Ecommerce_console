'use strict'

const { ForbiddenError } = require("../core/error.response");
const apiKeyModel = require("../model/apiKey.model");
const ApiKeyService = require("../service/apikey.service");
const { HEADER } = require("./authUtils");




// @ middleware apikey 
const apiKeyMiddlerware = async (req, res, next) => {
    try {
        // const newKeys = await apiKeyModel.create({
        //     key: crypto.randomBytes(64).toString('hex'),
        //     permissions: ['0000']
        // });
        // console.log({
        //     newKeys: `${newKeys?.key}`
        // })
        const key = req.headers[HEADER.API_KEY]?.toString();
        if (!key) throw new ForbiddenError('Error: APIKEY')
        // @ check apikey exits
        const objKey = await ApiKeyService.findByID(key);
        if (!objKey) throw new ForbiddenError('Error: APIKEY NOT FOUND')
        req.objKey = objKey;
        return next();
    } catch (error) {
        console.log({
            apiKey: `apiKey:: ${error}`
        })
    }
}

// @ middlerware check permission 
const permissionMiddleware = (requiredPermission) => {
    return (req, res, next) => {
        const { permissions } = req.objKey;
        if (!permissions) {
            return res.status(403).json({ message: "Forbidden: No permissions found" });
        }
        // Validate the required permission
        const hasPermission = permissions.includes(requiredPermission);
        if (!hasPermission) {
            return res.status(403).json({ message: "Forbidden: Insufficient permissions" });
        }
        return next();
    };
};

module.exports = { apiKeyMiddlerware, permissionMiddleware }