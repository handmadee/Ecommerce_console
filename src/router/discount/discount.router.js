'use strict'

const express = require('express');
const { asnycHandler } = require('../../helpers/asnycHandler');
const { authencation } = require('../../utils/authUtils');
const discountControler = require('../../controller/discount.controler');
const router = express.Router();



// @middlerware authen 

router.use(authencation);
// @middlerwatre refreshToken 
router.post('', asnycHandler(discountControler.createDiscount));
router.patch('/:id', asnycHandler(discountControler.updateDiscount));
router.get('/getDiscountByShop', asnycHandler(discountControler.getDiscountByShop));
router.get('/product/:id', asnycHandler(discountControler.getProductInDiscount));
// getDiscountAmount 
router.post('/discount_amount', asnycHandler(discountControler.getDiscountAmount));






module.exports = router;

