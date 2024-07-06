'use strict'

const shopModel = require("../model/shop.model")
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const KeyTokenService = require("./keytoken.service");
const { createTokenPair, getInfoData } = require("../utils/authUtils");
const shopService = require("./shop.service");
const { ForbiddenError, UnauthorizedError } = require("../core/error.response");


const ROLESHOP = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN'
}


class AccessService {
    // @sign up
    static signUp = async ({ name, email, password }) => {
        // Check email exits 
        const hollderShop = await shopModel.findOne({
            email
        }).lean();
        if (hollderShop) return { code: 401 };
        const passwordHash = await bcrypt.hash(password, 10);
        // Create Shop 


        // 
        const newShop = await shopModel.create({
            name, email, password: passwordHash, roles: [
                ROLESHOP.SHOP
            ]
        });
        console.log(newShop)
        // step Later Create shop success 
        // Create asToken and rfToken 
        if (newShop) {
            // const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
            //     modulusLength: 4096,
            //     publicKeyEncoding: {
            //         type: 'pkcs1',
            //         format: 'pem'
            //     },
            //     privateKeyEncoding: {
            //         type: 'pkcs1',
            //         format: 'pem'
            //     }
            // });

            // VER 2 ĐƠN GIẢN 
            const privateKey = crypto.randomBytes(64).toString('hex')
            const publicKey = crypto.randomBytes(64).toString('hex')



            const keyStore = await KeyTokenService.createToken({
                userID: newShop._id,
                publicKey,
                privateKey
            });
            if (!keyStore) return { code: '404' };
            // nếu publicToken sucess thì sẽ tạo ra 1 cặp token và đẩy về user 
            // Tạo ra publickey Object để verify data 
            // const publickeyObject = crypto.createPublicKey(publicKeyString)

            // console.log({
            //     publicKeyString: publicKeyString,
            //     publickeyObject: publickeyObject
            // })


            const tokens = await createTokenPair({ userID: newShop._id, email },
                publicKey, privateKey
            );

            console.log(`Created Token Sucess::`, tokens)
            return {
                code: 201,
                metadata: {
                    shop: getInfoData({ fileds: ['_id', 'name', 'email'], object: newShop }),
                    tokens
                }
            }
        }

    };
    // @sign in
    static login = async ({ email, password, refreshToken = null }) => {
        // @ checkEmail 
        const account = await shopService.findByEmail({ email });
        console.log({
            account: account
        })
        if (!account) throw new ForbiddenError('Shop no resgiter');
        // @ match password
        const match = await bcrypt.compare(password, account.password);
        if (!match) throw new UnauthorizedError('Authentication error');
        // @ create public key and private key 
        const privateKey = crypto.randomBytes(64).toString('hex');
        const publicKey = crypto.randomBytes(64).toString('hex');
        // @ userID 
        const { _id: userID } = account;
        // @ geanaration Token 
        const tokens = await createTokenPair({ userID, email },
            publicKey, privateKey
        );
        // @ save Token 
        await KeyTokenService.createToken({
            userID,
            publicKey,
            privateKey,
            refreshToken: tokens.refreshToken
        });
        // @ resuft data => true => 
        return {
            shop: getInfoData({ fileds: ['_id', 'name', 'email'], object: account }),
            tokens
        }
    }
    // @logout
    static logout = async (id) => {
        return await KeyTokenService.removeKeyByID(id);
    }
}

module.exports = AccessService;
