'use strict'
const express = require('express');
const { apiKeyMiddlerware, permissionMiddleware } = require('../utils/checkAuth');
const router = express.Router();
const access = require('./access/access.router');
const product = require('./product/product.router')

const VERSION_API = '/v1/api/'
// @ checkApikey 
router.use(apiKeyMiddlerware);
// @ checkPremission 
router.use(permissionMiddleware('0000'));
// @ router auth
router.use(`${VERSION_API}`, access);
router.use(`${VERSION_API}product`, product);

module.exports = router;