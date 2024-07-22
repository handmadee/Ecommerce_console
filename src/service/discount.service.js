'use strict'

const { findCodeByDiscount, createDiscount, findDiscountByID, updateDiscountByID,
    findAllDiscoutCodesUnSelect,
    deleteDiscount,
    updateDiscount
} = require("../model/repositories/discount.repo");
const { findAllProducts } = require("../model/repositories/product.repo");
const { convertObjectId } = require("../utils")
const { BadRequestError, NotFoundError, ForbiddenError } = require('./../core/error.response')
class DiscountService {
    // Create discount 
    static async createDiscount({
        name, description, type, code, value, min_order_vaue = 0,
        max_value, start_date, end_date, max_user, user_count, user_used, shopID, max_user_per_user, is_active, applies_to, product_ids
    }) {
        console.log({
            name, description, type, code, value, min_order_vaue,
            max_value, start_date, end_date, max_user, user_count, user_used, shopID, max_user_per_user, is_active, applies_to, product_ids
        })
        // check date 
        // if (new Date() < new Date(start_date) || new Date() > new Date(end_date)) {
        //     throw new BadRequestError('Date  expires !!');
        // }
        if (new Date(start_date) >= new Date(end_date)) {
            throw new BadRequestError('The start date cannot be greater than the end date');
        }
        // Find code exits 
        const foundDiscount = await findCodeByDiscount(code);
        if (foundDiscount && foundDiscount.discount_is_active) {
            throw new BadRequestError('Code is not exits');
        }
        // return 
        const payload = {
            discount_name: name,
            discount_description: description,
            discount_type: type,
            discount_value: value,
            discount_max_value: max_value,
            discount_code: code,
            discount_start_date: new Date(start_date),
            discount_end_date: new Date(end_date),
            discount_max_user: max_user,
            discount_max_count: user_count,
            discount_users_used: user_used,
            discount_max_users_per_used: max_user_per_user,
            discount_min_order_value: min_order_vaue || 0,
            discount_shopID: shopID,
            discount_is_active: is_active,
            discount_applies_to: applies_to
            , discount_product_ids: applies_to === 'all' ? [] : product_ids
        }
        const newDiscount = await createDiscount(payload);
        return newDiscount;
    }

    //  updateProduct 
    static async updateDiscount({
        id, shopID, payload
    }) {
        try {
            const foundDiscount = await findDiscountByID(id);
            if (!foundDiscount || !foundDiscount.discount_shopID == shopID) {
                throw new NotFoundError('Discount code does not exist');
            }
            const update = await updateDiscountByID(id, payload);
            return update;
        } catch (error) {
            console.log(error)
            throw new Error(error);
        }
    }

    // findProductbyDiscout 
    static async getProductInDiscount({ id, shopID, userID, limit = 10, page = 1 }) {
        const skip = (page - 1) * limit;
        const foundDiscount = await findDiscountByID(id);
        if (!foundDiscount || !foundDiscount.discount_shopID == shopID) {
            throw new NotFoundError('Discount code does not exist');
        }
        if (!foundDiscount.discount_is_active) throw new BadRequestError('Discount is not active');
        if (foundDiscount.discount_applies_to === 'all') {
            const query = {
                product_shop: convertObjectId(shopID),
                isPublish: true
            }
            const select = ['product_name'];
            const products = await findAllProducts({
                query, sort: 'ctime', limit: +limit, skip: +skip, select
            });
            return products;

        } else {
            const query = {
                _id: { $in: foundDiscount.discount_product_ids.map(id => convertObjectId(id)) },
                product_shop: convertObjectId(shopID),
                isPublish: true
            }
            const select = ['product_name'];
            const products = await findAllProducts({
                query, sort: 'ctime', limit: +limit, skip: +page, select
            });
            return products;
        }
    }

    // getDiscountByShop 
    static async getDiscountByShop({ shopID, limit, page }) {
        const query = {
            discount_shopID: convertObjectId(shopID),
            discount_is_active: true
        };
        const unSelect = ['__v', 'discount_shopID']
        const discount = await findAllDiscoutCodesUnSelect({
            filter: query,
            page, limit, unSelect
        });
        return discount;
    }

    // Get discount amount
    static async getDiscountAmount({ code, userId, shopId, products }) {
        console.log({
            code, userId, shopId, products
        })
        /*
        Step 1: check Discount exits 
        */
        const foundDiscount = await findCodeByDiscount(code, shopId);
        if (!foundDiscount) throw new BadRequestError('notfound Discount !!');
        const {
            _id,
            discount_max_user,
            discount_is_active,
            discount_users_used,
            discount_type,
            discount_value,
            discount_min_order_value,
            discount_max_users_per_used,
            discount_start_date,
            discount_end_date,
            discount_max_value
        } = foundDiscount;


        if (!discount_is_active) throw new NotFoundError(' Discount  not expired!!');
        if (!discount_max_user) throw new NotFoundError(' Discount full account !!');
        //Check date Discount 
        if (new Date() < new Date(discount_start_date) || new Date >= new Date(discount_end_date)) throw new NotFoundError(' Discount  not expired!!');
        // Check minOrder 
        let totalOrder = 0;
        if (discount_min_order_value >= 0) {
            // Tín giá trị đơn hàng 
            totalOrder = products.reduce((total, product) => {
                return total + (product.product_price * product.product_quantity);
            }, 0);


            if (discount_min_order_value > totalOrder) throw new ForbiddenError('The order has not reached the minimum value');
        }
        if (discount_max_users_per_used > 0) {
            // check xem mình đã sử dụng mã này lần thứ bao nhiêu rồi 
            const countUsedDiscount = discount_users_used.reduce((count, item) => {
                if (item == userId) {
                    count += 1;
                }
                return count;
            }, 0);
            if (countUsedDiscount >= discount_max_users_per_used) throw new ForbiddenError('You have used the encryption permission too many times');
            await updateDiscount({
                id: _id,
                payload: {
                    $push: { discount_users_used: convertObjectId(userId) },
                    $inc: {
                        discount_max_user: -1,
                        discount_max_count: 1
                    }
                }
            })
        }
        // Tính giá trị đơn hàng 
        const discount = discount_type == 'fixed_amount' ? discount_value : totalOrder * (discount_value / 100);
        if (discount > discount_max_value) discount = discount_max_value;

        return {
            totalOrder,
            discount,
            totalPrice: totalOrder - discount
        }

    }

    // Delete Discount  
    static async deleteDiscount({ discountCode, shopId }) {
        return await deleteDiscount({
            discountCode,
            shopId
        })
    }

    /*
    delete discount sau khi đã sử dụng 
    check xem discount tăng thêm user đã sử dụng và số user đã sử dụng 
    */
    static async cancelDiscount({ discountCode, userId, shopId }) {
        // findDiscount
        const discount = await findCodeByDiscount(discountCode, shopId);
        if (!discount) throw new ForbiddenError("Discount code does't exist");
        const resuft = await updateDiscount({
            id: discount._id,
            payload: {
                $pull: { discount_users_used: userId },
                $inc: {
                    discount_max_user: 1,
                    discount_max_count: -1
                }
            }
        });
        return resuft;
    }
}


module.exports = DiscountService;