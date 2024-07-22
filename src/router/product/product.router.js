'use strict'

const express = require('express');
const { asnycHandler } = require('../../helpers/asnycHandler');
const { authencation } = require('../../utils/authUtils');
const productControler = require('../../controller/product.controler');
const router = express.Router();


// User search 
router.get('/search/:qKeyWord', asnycHandler(productControler.searchAllProduct));
router.get('/productAll/:page', asnycHandler(productControler.findAllProduct));
router.get('/findProduct/:id', asnycHandler(productControler.findProduct));

// @middlerware authen 
router.use(authencation);
// @middlerwatre refreshToken 
router.post('/created', asnycHandler(productControler.createProduct));

// Query
router.get('/getAllDraft', asnycHandler(productControler.findAllDrafsForShop));
router.get('/getAllPublic', asnycHandler(productControler.findAllPublicForShop));

// Put
router.put('/onPublic/:id', asnycHandler(productControler.onPublicProductForShop));
router.put('/onDraft/:id', asnycHandler(productControler.onDraftProductForShop));

// Patch
router.patch('/modify/:idProduct', asnycHandler(productControler.updateProduct));



module.exports = router;

