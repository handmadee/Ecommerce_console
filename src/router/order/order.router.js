'use strict'
const express = require('express');
const { asnycHandler } = require('../../helpers/asnycHandler');
const { authencation, getRefeshTokenV2 } = require('../../utils/authUtils');
const orderController = require('../../controller/order.controller');
const router = express.Router();

// router.use(authencation);
router.post('/checkout', asnycHandler(orderController.reviewOrder));
router.post('/cashout', asnycHandler(orderController.handlerOrder));


module.exports = router;