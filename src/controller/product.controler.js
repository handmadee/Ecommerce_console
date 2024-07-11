'use strict'

const { OK, CREATEDS } = require("../core/success.response");
const ProductFactory = require("../service/product.service");


class ProductControler {
    createProduct = async (req, res) => {
        const payload = req.body;
        // type shopId id 
        return new CREATEDS(
            'Create product success fuly',
            {
                data: await ProductFactory.createProduct(payload.product_type, {
                    ...payload,
                    product_shop: req.user.userID
                })
            }
        ).send(res)
    }

    // Get
    findAllDrafsForShop = async (req, res) => {
        const { userID } = req.user;
        // type shopId id 
        return new OK(
            {
                message: 'findAllDrafsForShop success ',
                data: await ProductFactory.findAllDrafsForShop({
                    product_shop: userID
                })
            }
        ).send(res)
    }
    findAllPublicForShop = async (req, res) => {
        const { userID } = req.user;
        // type shopId id 
        return new OK(
            {
                message: 'findAllDrafsForShop success ',
                data: await ProductFactory.findAllPublicForShop({
                    product_shop: userID
                })
            }
        ).send(res)
    }

    // Patch 
    onPublicProductForShop = async (req, res) => {
        const { userID } = req.user;
        const product_id = req.params.id;
        return new OK(
            {
                message: 'onPublic product success ',
                data: await ProductFactory.onPublicProductForShop({
                    product_shop: userID,
                    product_id
                })
            }
        ).send(res)


    }

    onDraftProductForShop = async (req, res) => {
        const { userID } = req.user;
        const product_id = req.params.id;
        return new OK(
            {
                message: 'on Draft product success ',
                data: await ProductFactory.onDraftProductForShop({
                    product_shop: userID,
                    product_id
                })
            }
        ).send(res)


    }


}

module.exports = new ProductControler();

