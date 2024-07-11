'use strict'

const express = require('express');
const { asnycHandler } = require('../../helpers/asnycHandler');
const { authencation } = require('../../utils/authUtils');
const productControler = require('../../controller/product.controler');
const router = express.Router();



// @middlerware authen 
router.use(authencation);
// @middlerwatre refreshToken 
router.post('/created', asnycHandler(productControler.createProduct));

// Query
router.get('/getAllDraft', asnycHandler(productControler.findAllDrafsForShop));
router.get('/getAllPublic', asnycHandler(productControler.findAllPublicForShop));

// Patch 
router.put('/onPublic/:id', asnycHandler(productControler.onPublicProductForShop));
router.put('/onDraft/:id', asnycHandler(productControler.onDraftProductForShop));


module.exports = router;

