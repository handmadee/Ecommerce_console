'use strict'

const { Types } = require("mongoose")
const { product } = require("../product.model")
const { selectDataV2, unSelectDataV2, unSelectData, removeNesstedAttributesObject, removeNestedAttributesObjectV3, convertObjectId } = require("../../utils")

/** 
 * @type {*}
 * @desc {}
 *  */


// Search  
const searchProduct = async (keyword) => {
    console.log(keyword)
    const regexSearch = new RegExp(keyword); // tìm kiếm linh hoạt hơn convernt sang biểu thức chính quy 
    const resuft = product.find({
        isPublish: true,
        $text: { $search: regexSearch }
    }, { score: { $meta: 'textScore' } }).sort({ score: { $meta: 'textScore' } }).lean().exec();
    return resuft;
}


// Patch 
/**
 *
 *
 * @param {*} { product_shop, product_id }
 * @return {*} 
 */
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
/**
 *
 *
 * @param {*} { query, limit, skip }
 * @return {*} 
 */
const findAllDrafsForShop = async ({ query, limit, skip }) => {
    return findAllProductForShop(query, limit, skip)
}

/**
 *
 *
 * @param {*} { query, limit, skip }
 * @return {*} 
 */
const findAllPublicForShop = async ({ query, limit, skip }) => {
    return findAllProductForShop(query, limit, skip)
}
/**
 *
 *
 * @param {*} { query, sort, limit, skip, select }
 * @return {*} 
 */
const findAllProducts = async ({ query, sort, limit, skip, select }) => {
    const querySort = sort == 'ctime' ? { createdAt: -1 } : { createdAt: 1 }
    return product.find(query)
        .sort(querySort)
        .skip(skip)
        .limit(limit)
        .select(selectDataV2(select))
        .lean()
        .exec()
}

const findProduct = async ({ product_id, unSelect }) => {
    return await product.findById(product_id).select(unSelectDataV2(unSelect)).lean()
}


const modifyProduct = async ({ productId, payload, model }) => {
    return await model.findByIdAndUpdate(productId, payload, { new: true });
}

// Optimize fNC 
async function findAllProductForShop(query, limit, skip) {
    return await product.find(query)
        .populate('product_shop', 'name email -_id')
        .sort({ updateAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
        .exec()
}

async function listProducts(listItem = [], shopId) {
    console.log(listItem, shopId)
    return Promise.all(
        listItem.map(async (item) => {
            console.log(item)
            const newProduct = await product.findOne({
                _id: convertObjectId(item.productId),
                product_shop: convertObjectId(shopId)
            }).lean();
            console.log(newProduct)
            if (newProduct) {
                return {
                    productId: newProduct._id,
                    quantity: item.quantity,
                    price: newProduct.product_price
                }
            }
        })
    )

}

module.exports = { findAllPublicForShop, findAllDrafsForShop, onPublicProductForShop, onDraftProductForShop, searchProduct, findAllProducts, findProduct, modifyProduct, listProducts }



