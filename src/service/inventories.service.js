'use strict'

const { createdInventoriesv2 } = require("../model/repositories/inventories.repo")

class InventoriesService {
    static async addStockToInventory({
        stock,
        productId,
        shopId,
        location = 'Console Ecomern'
    }) {
        return await createdInventoriesv2({
            inven_prodcutId: productId,
            inven_shopId: shopId,
            inven_stock: stock,
            inven_location: location
        });
    }
}

module.exports = InventoriesService;