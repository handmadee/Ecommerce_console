'use strict'

const { BadRequestError } = require("../../core/error.response");
const { convertObjectId } = require("../../utils");
const inventoriesModel = require("../inventories.model");
const { findProduct } = require("./product.repo");


// insert productModel
const createdInventories = async ({ inven_prodcutId, inven_location = "unKnow", inven_stock, inven_shopId, inven_reservations = [] }) => {
    try {
        const newInventory = await inventoriesModel.create({
            inven_location, inven_prodcutId, inven_reservations, inven_shopId, inven_stock
        });
        return newInventory;
    } catch (error) {
        console.error("Error creating inventory:", error);
        throw error;
    }
};

// Created inventory
const createdInventoriesv2 = async ({ inven_prodcutId, inven_location = "unKnow", inven_stock, inven_shopId }) => {
    const query = {
        inven_prodcutId: convertObjectId(inven_prodcutId),
        inven_shopId: convertObjectId(inven_shopId)
    },
        updateSet = {
            $inc: {
                inven_stock: inven_stock
            },
            $set: {
                inven_location: inven_location
            }
        },
        opition = {
            upsert: true,
            new: true
        }
    const foundProduct = await findProduct({
        product_id: inven_prodcutId,
        unSelect: ['__v']
    });
    if (!foundProduct) throw new BadRequestError('Product notfound !!!')
    return await inventoriesModel.findOneAndUpdate(query, updateSet, opition);
};

// deleteInventory  
const deleteProductInInventoryForShop = async ({ inven_prodcutId, quantity, cartId }) => {
    const query = {
        _id: convertObjectId(inven_prodcutId),
        inven_stock: { $gte: quantity }
    }
    const update = {
        $inc: { inven_stock: -quantity },
        $push: {
            inven_reservations: {
                quantity,
                cartId,
                createdOn: new Date()
            }
        }
    }
    const opition = {
        new: true
    }
    return await inventoriesModel.updateOne(query, update, opition);

}


module.exports = { createdInventories, createdInventoriesv2, deleteProductInInventoryForShop }