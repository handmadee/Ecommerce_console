'use strict'

const { OK, CREATEDS } = require("../core/success.response");
const ProductFactory = require("../service/product.service");
const { removeNesstedAttributesObject } = require("../utils");


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

    searchAllProduct = async (req, res) => {
        const keyword = req.params.qKeyWord;
        // type shopId id 
        return new OK(
            {
                message: 'search OK ',
                data: await ProductFactory.searchAllProduct(keyword)
            }
        ).send(res)
    }

    /**
     *
     *
     * @param {*} req
     * @param {*} res
     * @memberof ProductControler
     */
    findAllProduct = async (req, res) => {
        const { page, sort } = req.params;
        console.log({
            message: 'Test',
            page,
            sort
        });
        // type shopId id 
        return new OK(
            {
                message: 'findAllProduct OK ',
                data: await ProductFactory.findAllProduct({ page, sort })
            }
        ).send(res)
    }

    /**
     *
     *
     * @param {*} req
     * @param {*} res
     * @memberof ProductControler
     */
    findProduct = async (req, res) => {
        const id = req.params.id;
        console.log(id)
        // type shopId id 
        return new OK(
            {
                message: 'find Product Success !! ',
                data: await ProductFactory.findProduct(id)
            }
        ).send(res)
    }

    updateProduct = async (req, res) => {
        const productId = req.params.idProduct;
        const payload = req.body;
        const newPay = removeNesstedAttributesObject(payload);
        return new OK(
            {
                message: 'Update Product Success !! ',
                data: await ProductFactory.modifyProduct({
                    payload: newPay,
                    product_id: productId,
                    type: payload.product_type
                })
            }
        ).send(res)
    }



}

module.exports = new ProductControler();

