'use strict'
const JWT = require('jsonwebtoken');
const _ = require('lodash');
const { asnycHandler } = require('../helpers/asnycHandler');
const { UnauthorizedError, ForbiddenError, NotFoundError } = require('../core/error.response');
const KeyTokenService = require('../service/keytoken.service');




const HEADER = {
    API_KEY: 'x-api-key',
    CLIENT_ID: 'x-client-id',
    AUTHORIZATION: 'authorization',
    REFRESHTOKEN: 'rf-token'
}

const jwt = require('jsonwebtoken');
const ShopService = require('../service/shop.service');
const { OK } = require('../core/success.response');

const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        const accessToken = await jwt.sign(payload, publicKey, {
            // algorithm: 'RS256',
            expiresIn: '2d'
        });
        const refreshToken = await jwt.sign(payload, privateKey, {
            // algorithm: 'RS256',
            expiresIn: '7d'
        });
        // Demo verify
        try {
            const decoded = await jwt.verify(accessToken, publicKey);
            console.log("Yes", decoded);
        } catch (err) {
            console.error(`Expires[AccessToken] :: ${err}`);
        }

        return { accessToken, refreshToken };
    } catch (error) {
        console.error(error);
        throw new Error('Token creation failed');
    }
};

module.exports = createTokenPair;


// @ authencation ID -> access token 
// milddeware authen 
const authencation = asnycHandler(async (req, res, next) => {
    /**
     * 1- Check userID missing ??? 
     * 2- get access token 
     * 3- verify token 
     * 4- check user in dbs 
     * 5- check keyStore 
     * 6- OK -all => return next()
     */

    // authen v2 khắc phục sai lầm v1

    const userID = req.headers[HEADER.CLIENT_ID];
    console.log({ userID: userID })
    if (!userID) throw new UnauthorizedError('Invalid Request 1');
    // @find 
    const keyStore = await KeyTokenService.findUserID(userID);
    if (!keyStore) throw new NotFoundError('userID notfound');
    // Verifire token 
    const refreshToken = req.headers[HEADER.REFRESHTOKEN];
    if (!refreshToken) throw new UnauthorizedError('Invalid Request rf not found')
    try {
        const decode = await KeyTokenService.verifyJWT(refreshToken, keyStore.privateKey);
        if (!decode) throw new UnauthorizedError('Invalid Request');
        console.log({
            message: "DECODE JWT",
            decode: `decode:: ${decode}`,
            decode
        })
        if (userID !== decode.userID) throw new UnauthorizedError('Invalid Request');
        req.keyStore = keyStore;
        req.refreshToken = refreshToken;
        req.user = decode;
        next();
    } catch (error) {
        console.log(error)
    }

    // select data  










})




// @ getRefeshtoken 
const getRefeshToken = async (req, res, next) => {
    /**
     * LOGIC :
     * 1. checked refeshtokenused 
     * 2. if rf exist => delete key 
     * 3. else verifytoken => and create pairToken 
     * 4. check user exist and update keyToken 
     * 5. return 200. 
     */
    const refreshToken = req.body.refreshToken;
    const token = await KeyTokenService.findRefreshTokenUsed(refreshToken);
    if (token) {
        await KeyTokenService.removeKeyByID(token._id);
        throw new ForbiddenError('ples rLogin !!');
    }
    //
    const rfToken = await KeyTokenService.findRefreshToken(refreshToken);
    if (!rfToken) throw new UnauthorizedError('shop not rfToken ! 1');
    const decode = await KeyTokenService.verifyJWT(refreshToken, rfToken.privateKey);
    if (!decode) throw new UnauthorizedError('shop not resgiter ! 1');
    const account = await ShopService.findByEmail({ email: decode.email });
    if (!account) throw new UnauthorizedError('shop not resgiter ! 2');
    // @ create Pairtoken
    const tokenStore = await createTokenPair({ userID: decode.userID, email: decode.email }, rfToken.publicKey, rfToken.privateKey);

    // @ update Token 
    const addRF = await KeyTokenService.addRefreshToken({
        _id: rfToken._id, refreshToken: tokenStore.refreshToken,
        refreshTokenUsed: refreshToken
    })
    // 
    console.log({
        message: `add Refresh`,
        addRF: addRF
    })
    return new OK({
        message: `refresh token :: success finaly`,
        data: tokenStore
    }).send(res);
}


const getRefeshTokenV2 = async (req, res, next) => {
    /**
     * LOGIC :
     * 1. checked refeshtokenused 
     * 2. if rf exist => delete key 
     * 3. else verifytoken => and create pairToken 
     * 4. check user exist and update keyToken 
     * 5. return 200. 
     */
    const keyStore = req.keyStore;
    const refreshToken = req.refreshToken;
    console.log({
        refreshToken: refreshToken
    });
    const { email, userID } = req.user;
    console.log({
        email,
        userID
    })


    const token = await KeyTokenService.findRefreshTokenUsed(refreshToken);
    if (token) {
        await KeyTokenService.removeKeyByID(token._id);
        throw new ForbiddenError('ples rLogin !!');
    }
    // Check token 
    if (keyStore.refreshToken !== refreshToken) throw new UnauthorizedError('shop not resgiter ! 2');

    const account = await ShopService.findByEmail({ email: email });
    if (!account) throw new UnauthorizedError('shop not resgiter ! 2');


    // @ create Pairtoken
    const tokenStore = await createTokenPair({ userID: userID, email: email }, keyStore.publicKey, keyStore.privateKey);

    // @ update Token 
    const addRF = await KeyTokenService.addRefreshToken({
        _id: keyStore._id, refreshToken: tokenStore.refreshToken,
        refreshTokenUsed: refreshToken
    })
    // 
    console.log({
        message: `add Refresh`,
        addRF: addRF
    })
    return new OK({
        message: `refresh token :: success finaly`,
        data: tokenStore
    }).send(res);
}


const getInfoData = ({
    fileds = [], object = {}
}) => {
    return _.pick(object, fileds)
}



module.exports = {
    createTokenPair, getInfoData, HEADER, authencation,
    getRefeshToken, getRefeshTokenV2
}