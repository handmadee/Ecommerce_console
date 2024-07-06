'use strict'

const express = require('express');
const accessControler = require('../../controller/access.controler');
const { asnycHandler } = require('../../helpers/asnycHandler');
const { authencation, getRefeshTokenV2 } = require('../../utils/authUtils');
const router = express.Router();



router.post('/signup', asnycHandler(accessControler.signUp));
// Login service 
router.post('/login', asnycHandler(accessControler.login));
// @middlerware authen 
router.use(authencation);
// @middlerwatre refreshToken 
router.post('/refreshToken', asnycHandler(getRefeshTokenV2))
// @middlerware logout
router.post('/logout', asnycHandler(accessControler.logout))


module.exports = router;

