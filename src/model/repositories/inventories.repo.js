'use strict'

const inventoriesModel = require("../inventories.model")


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


module.exports = { createdInventories }