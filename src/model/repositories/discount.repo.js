'use strict'


const { convertObjectId, unSelectData, selectDataV2, removeNesstedAttributesObject, unSelectDataV2 } = require("../../utils");
const discountModel = require("../discount.model");


const createDiscount = async (payload) => await discountModel.create(payload);

const findCodeByDiscount = async (code, shopID) => await discountModel.findOne({
    discount_code: code,
    discount_shopID: convertObjectId(shopID)
}).lean();

const findDiscountByID = async (_id) => await discountModel.findById(_id).lean();
const updateDiscountByID = async (_id, payload) => {
    const newDiscount = removeNesstedAttributesObject(payload);
    return await discountModel.findByIdAndUpdate(_id, newDiscount, { new: true });
}

// findDiscount by Shop 
const findAllDiscoutCodesUnSelect = async ({
    limit = 50,
    page = 1,
    sort = 'ctime',
    filter = {},
    unSelect
}) => {
    const skip = (page - 1) * limit;
    return await discountModel.find(filter)
        .sort(sort)
        .skip(+skip)
        .limit(+limit)
        .select(unSelectData(unSelect))
        .lean()
}

const findAllDiscoutCodesSelect = async ({
    limit = 50,
    page = 1,
    sort = 'ctime',
    filter = {},
    unSelect
}) => {
    return await discountModel.find(filter)
        .sort(sort)
        .skip(page)
        .limit(limit)
        .select(selectDataV2(unSelect))
        .lean()
};



const deleteDiscount = async ({ discountCode, shopId }) => {
    return await discountModel.findOneAndDelete({
        discount_code: discountCode,
        discount_shopID: convertObjectId(shopId)
    });
}

const updateDiscount = async ({ query, payload }) => {
    return await discountModel.updateOne(query, payload, { new: true });
}

module.exports = { createDiscount, findCodeByDiscount, findDiscountByID, updateDiscountByID, findAllDiscoutCodesUnSelect, findAllDiscoutCodesSelect, deleteDiscount, updateDiscount }