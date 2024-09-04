'use strict'
const express = require('express');
const { apiKeyMiddlerware, permissionMiddleware } = require('../utils/checkAuth');
const router = express.Router();
const access = require('./access/access.router');
const product = require('./product/product.router');
const discount = require('./discount/discount.router');
const cart = require('./cart/cart.router');
const order = require('./order/order.router')
const inventory = require('./inventory/inventory.router')
const VERSION_API = '/v1/api/'
// @ checkApikey 
// router.use(apiKeyMiddlerware);
// // @ checkPremission 
// router.use(permissionMiddleware('0000'));
// @ router auth
router.use(`${VERSION_API}product`, product);
router.use(`${VERSION_API}discount`, discount);
router.use(`${VERSION_API}cart`, cart);
router.use(`${VERSION_API}order`, order);
router.use(`${VERSION_API}inventory`, inventory);
//
router.use(`${VERSION_API}`, access);

module.exports = router;