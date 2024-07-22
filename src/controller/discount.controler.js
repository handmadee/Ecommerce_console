'use strict'

const { OK } = require("../core/success.response");
const DiscountService = require("../service/discount.service")

class DiscountControler {
    async createDiscount(req, res) {
        const payload = req.body;
        const { userID } = req.user;
        return new OK({
            message: 'Created discount success',
            data: await DiscountService.createDiscount({ ...payload, shopID: userID })
        }).send(res);
    }

    async updateDiscount(req, res) {
        const { id } = req.params;
        const payload = req.body;
        const { userID } = req.user;

        console.log({
            id,
            payload
        })
        return new OK({
            message: 'Update discount success',
            data: await DiscountService.updateDiscount({
                shopID: userID,
                id,
                payload
            })
        }).send(res);
    }

    async getProductInDiscount(req, res) {
        const id = req.params.id;
        const { page, limit } = req.query;
        const { userID } = req.user;
        return new OK({
            message: 'ListProduct discount success',
            data: await DiscountService.getProductInDiscount({
                shopID: userID,
                id,
                page,
                limit
            })
        }).send(res);
    }


    async getDiscountByShop(req, res) {
        const { page, limit } = req.query;
        const { userID } = req.user;
        console.log(userID)
        return new OK({
            message: 'getDiscountByShop discount by shop success',
            data: await DiscountService.getDiscountByShop({
                shopID: userID,
                page,
                limit
            })
        }).send(res);
    }

    async getDiscountAmount(req, res) {
        const { code, userId, products } = req.body;
        const { userID } = req.user;
        return new OK({
            message: 'ListProduct discount by shop success',
            data: await DiscountService.getDiscountAmount({
                code, userId, products, shopId: userID
            })
        }).send(res);
    }


    async deleteDiscount(req, res) {
        const { code } = req.params;
        const { userID } = req.user;
        return new OK({
            message: 'DeleteDiscount success',
            data: await DiscountService.deleteDiscount({
                discountCode: code,
                shopId: userID
            })
        }).send(res);
    }


    async cancelDiscount(req, res) {
        const { code, id } = req.query;
        const { userID } = req.user;
        return new OK({
            message: 'cancelDiscount success',
            data: await DiscountService.cancelDiscount({
                discountCode: code,
                shopId: userID,
                userId: id
            })
        }).send(res);
    }





}

module.exports = new DiscountControler();