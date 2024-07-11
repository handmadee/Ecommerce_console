'use strict'

const { Types } = require("mongoose")
const { product, clothing, electronic } = require("../product.model")

/** 
 * @type {*}
 * @desc {}
 *  */



// Patch 
const onPublicProductForShop = async ({ product_shop, product_id }) => {
    const foundShop = await product.findOne({
        product_shop: new Types.ObjectId(product_shop),
        _id: new Types.ObjectId(product_id)
    })
    if (!foundShop) return null;
    foundShop.isDraft = false;
    foundShop.isPublish = true;
    const { modifiedCount } = await product.updateOne({ _id: foundShop._id }, foundShop);
    // if any => 1 : 0
    return modifiedCount;
}
/**
 *
 *
 * @param {*} { product_shop, product_id }
 * @return {*} 1 or 0 <success or unSuccess/>
 */
const onDraftProductForShop = async ({ product_shop, product_id }) => {
    const foundShop = await product.findOne({
        product_shop: new Types.ObjectId(product_shop),
        _id: new Types.ObjectId(product_id)
    })
    if (!foundShop) return null;
    foundShop.isDraft = true;
    foundShop.isPublish = false;
    const { modifiedCount } = await product.updateOne({ _id: foundShop._id }, foundShop);
    return modifiedCount;
}




// Query

const findAllDrafsForShop = async ({ query, limit, skip }) => {
    return findAllProductForShop(query, limit, skip)
}

const findAllPublicForShop = async ({ query, limit, skip }) => {
    return findAllProductForShop(query, limit, skip)
}





async function findAllProductForShop(query, limit, skip) {
    return await product.find(query)
        .populate('product_shop', 'name email -_id')
        .sort({ updateAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
        .exec()
}

module.exports = { findAllPublicForShop, findAllDrafsForShop, onPublicProductForShop, onDraftProductForShop }



