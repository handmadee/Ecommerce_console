'use strict'

const { OK } = require("../core/success.response");
const InventoriesService = require("../service/inventories.service")

class InventoryController {

    /**
     *
     *
     * @param 
         stock,
        productId,
        shopId,
        location = 'Console Ecomern'
     * @param {*} res
     * @return {*} 
     * @memberof InventoryController
     */

    async addStockToInventory(req, res) {
        const payload = req.body;
        const { userID } = req.user;
        console.log(payload, userID)
        return new OK({
            message: 'add Stock sucess',
            data: await InventoriesService.addStockToInventory({
                ...payload, shopId: userID
            })
        }).send(res);
    }
}

module.exports = new InventoryController();