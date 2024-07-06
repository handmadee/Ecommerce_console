'use strict'


const { CREATEDS, OK } = require("../core/success.response");
const AccessService = require("../service/access.service");


class AccessControler {
    signUp = async (req, res, next) => {
        const payload = req.body;
        return new CREATEDS(
            '[Created]:: success',
            await AccessService.signUp(payload)
        ).send(res);
    };
    // @ Login Controller 
    login = async (req, res, next) => {
        const payload = req.body;
        return new OK(
            {
                message: '[Login success] :: success full ',
                data: await AccessService.login(payload)
            }
        ).send(res);
    }
    // @ Logout 
    logout = async (req, res) => {
        const { _id } = req.keyStore;
        console.log(_id)
        return new OK({
            message: '[Logout success] :: success full ',
            data: await AccessService.logout(_id)
        }).send(res)
    }


}

module.exports = new AccessControler();