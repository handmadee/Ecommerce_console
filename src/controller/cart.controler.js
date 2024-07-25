'use strict'
const { OK, CREATEDS } = require('./../core/success.response');
const CartService = require("../service/cart.service");

class cartControler {
    async addItemToCart(req, res) {
        const { userID, product } = req.body;
        return new CREATEDS({
            message: `Created success fully`,
            data: await CartService.addToCart({
                userID,
                products: product
            })
        }).send(res);
    }
    async insertToCart(req, res) {
        const { userId, product } = req.body;
        return new OK({
            message: `insert success fully`,
            data: await CartService.addToCartV2({
                userId,
                product
            })
        }).send(res)
    }

    async deleteProductInCart(req, res) {
        const { userId, product } = req.body;
        return new OK({
            message: `Delete success`,
            data: await CartService.removeProductInCart({
                userId,
                product
            })
        }).send(res)
    }



    async clearAllCart(req, res) {
        const { userId } = req.body;
        return new OK({
            message: `Clear all cart success`,
            data: await CartService.clearProductInCart({
                userId
            })
        }).res(res)
    }

    async getAllProductInCart(req, res) {
        const { id } = req.params;
        return new OK({
            message: `Get product in cart success`,
            data: await CartService.getAllProductInCart({
                userId: id
            })
        }).send(res)
    }


}


module.exports = new cartControler();