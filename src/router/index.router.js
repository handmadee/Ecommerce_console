'use strict'
const express = require('express');
const { apiKeyMiddlerware, permissionMiddleware } = require('../utils/checkAuth');
const { asnycHandler } = require('../helpers/asnycHandler');
const router = express.Router();

const VERSION_API = '/v1/api/'
// @ checkApikey 
router.use(apiKeyMiddlerware);
// @ checkPremission 
router.use(permissionMiddleware('0000'));


// @ router auth
router.use(VERSION_API, require('./access/access.router'));

module.exports = router;