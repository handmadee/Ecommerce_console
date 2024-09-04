'use strict'


const { OK, CREATEDS } = require('./../core/success.response');
const orderService = require("../service/order.service");

class OrderCotroller {
    async reviewOrder(req, res) {
        const { cartId, userId, shop_order_ids } = req.body;
        return new OK({
            message: 'reviewOrder Success !',
            data: await orderService.reviewOrder({
                cartId, userId, shop_order_ids
            })
        }).send(res);
    }
    /**
     *
     *
     * @param {cartId, order_payment, order_shipping,order_status,userId,shop_order_ids} req
     * @param {*} res
     * @return {*} 
     * @memberof OrderCotroller
     */
    async handlerOrder(req, res) {
        return new OK({
            message: 'handlerOrder Success !',
            data: await orderService.handlerOrder(
                req.body
            )
        }).send(res);

    }

}


module.exports = new OrderCotroller();
