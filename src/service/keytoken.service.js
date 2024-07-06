'use strict'
const { Types } = require('mongoose');
const KeyTokenModel = require('../model/keytoken.model');
const JWT = require('jsonwebtoken');




class KeyTokenService {
    static createToken = async ({ userID, publicKey, privateKey, refreshToken }) => {
        // // const publicKeyString = publicKey.toString();
        // const tokens = await KeyTokenModel.create({
        //     user: userID,
        //     publicKey, privateKey

        // });
        // return tokens ? tokens : null;


        // Ver 2 
        const filter = { user: userID },
            update = {
                publicKey,
                privateKey,
                refreshTokenUsed: [],
                refreshToken
            },
            options = {
                upsert: true,
                new: true // nếu nó chưa tồn tại thì tiến hành tạo, còn đã tồn tại thì tiến hành cập nhật 
            }
        const tokens = await KeyTokenModel.findOneAndUpdate(filter, update, options);
        return tokens ? tokens.publicKey : null;
    }
    // findID 
    static findUserID = async (userID) => {
        return await KeyTokenModel.findOne({
            user: new Types.ObjectId(userID)
        }).lean();
    }
    // remove key 
    static removeKeyByID = async (_id) => {
        return await KeyTokenModel.deleteOne({ _id: new Types.ObjectId(_id) });
    }
    // @ findRefesh Token  Used
    static findRefreshTokenUsed = async (refreshToken) => {
        return await KeyTokenModel.findOne({
            refreshTokenUsed: refreshToken
        })
    }
    // @ findRefes Token 
    static findRefreshToken = async (refreshToken) => {
        return await KeyTokenModel.findOne({
            refreshToken: refreshToken
        })
    }
    // @ VRF refreshToken 
    static verifyJWT = async (token, key) => {
        try {
            const decoded = await JWT.verify(token, key);
            return decoded;
        } catch (error) {
            console.error('Error verifying JWT:', error);
            throw error
        }
    }
    // @update refeshtoken 
    static addRefreshToken = async ({
        _id, refreshToken, refreshTokenUsed
    }) => {
        return await KeyTokenModel.findOneAndUpdate(
            { _id },
            {
                $set: { refreshToken },
                $addToSet: { refreshTokenUsed }
            },
            { new: true }
        )
    }
}
module.exports = KeyTokenService;
