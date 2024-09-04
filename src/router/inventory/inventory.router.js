'use strict'


const express = require('express');
const { asnycHandler } = require('../../helpers/asnycHandler');
const { authencation, getRefeshTokenV2 } = require('../../utils/authUtils');
const inventoriesControler = require("../../controller/inventories.controler")
const router = express.Router();


router.use(authencation);
router.post('', asnycHandler(inventoriesControler.addStockToInventory));


module.exports = router;