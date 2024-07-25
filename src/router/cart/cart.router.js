'use strict'

const express = require('express');
const { asnycHandler } = require('../../helpers/asnycHandler');
const { authencation, getRefeshTokenV2 } = require('../../utils/authUtils');
const cartControler = require('../../controller/cart.controler');
const router = express.Router();



router.get('/:id', asnycHandler(cartControler.getAllProductInCart));
router.post('/', asnycHandler(cartControler.addItemToCart));
router.patch('/', asnycHandler(cartControler.insertToCart));
router.patch('/removeItem', asnycHandler(cartControler.deleteProductInCart));
router.delete('/clearProduct', asnycHandler(cartControler.clearAllCart));

module.exports = router;