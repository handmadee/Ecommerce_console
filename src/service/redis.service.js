'use strict'

const redis = require('redis');
const { promisify } = require('util'); // chuyển đổi các callback truyền thống thành promise
const { deleteProductInInventoryForShop } = require('../model/repositories/inventories.repo');
const redisClient = redis.createClient();  // Tạo 1 clientRedis đẻ connect với server Redis

// promisify(redisClient.pexprire) chuyển đổi hàm pexprire từ dạng callback sang dạng Promise.
const pexprice = promisify(redisClient.pExpire).bind(redis); // redisClient.pExpire là hàm để đặt thời gian cho khoá trong redis và được tính bằng miliseconend


// promisify(redisClient.setNX) chuyển đổi hàm setNX từ dạng callback sang dạng Promise.
const setnx = promisify(redisClient.setNX).bind(redis); // redisClient.setNX dùng để đặt giá trị cho một khoá chỉ khi khoá đó chưa tồn tại 





const acquireLock = async (productId, quantity, cartId) => {
    const key = `v_console_${productId}`;
    const retrytime = 10; // số lần thử lại
    const expireTime = 3000; // thời gian khóa tạm thời (ms)

    for (let i = 0; i < retrytime; i++) {
        const resuft = await setnx(key, expireTime);
        // resuft == 1 => chưa có ai giữ khóa; 0 => đã có người giữ khóa 
        if (resuft === 1) {
            const productInInventory = await deleteProductInInventoryForShop({
                inven_prodcutId, quantity, cartId
            });
            if (!productInInventory.modifiedCount) {
                await pexprice(key, expireTime);
                return key;
            }
            return null;
        } else {
            await new Promise((resolve) => setTimeout(resolve, 50));
        }
    }
}

// Giải phóng khóa
// xôa khoa ra khoi redis
const releaseLock = async keyLock => {
    const delAsync = promisify(redisClient.del).bind(redisClient);
    return await delAsync(keyLock);
}

module.exports = { acquireLock, releaseLock };

