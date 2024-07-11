'use strict'

const { Types } = require("mongoose");
const { BadRequestError, NOT_FOUND } = require("../core/error.response");
const { product, electronic, clothing, furntiture } = require("../model/product.model");
const { findAllDrafsForShop, findAllPublicForShop, onPublicProductForShop, onDraftProductForShop } = require("../model/repositories/product.repo");
const { NO_CONTENT } = require("../core/reasonPhrases");

/**
 *
 *
 * @class ProductFactory
 */
class ProductFactory {
    // Desgin V1 

    // async createProduct(type, payload) {
    //     console.log({
    //         type: type,
    //         payload: payload
    //     });
    //     switch (type) {
    //         case 'Electronics': return await new Electronic(payload).createProduct();
    //         case 'Clothing': return await new Clothing(payload).createProduct();
    //         case 'Furniture': return await new Furntiture(payload).createProduct();
    //         default:
    //             throw new BadRequestError('! type Product not found !');
    //     }
    // }

    static factoryProduct = {};
    static resgiterProduct(key, value) {
        return ProductFactory.factoryProduct[key] = value;
    };
    async createProduct(type, payload) {
        const Product = ProductFactory.factoryProduct[type];
        if (!Product) return BadRequestError(`
            ! notFound  ${type} :: Product
            `);
        return await new Product(payload).createProduct();
    }
    // Patch
    async onPublicProductForShop({
        product_shop, product_id
    }) {
        const resuft = await onPublicProductForShop({ product_shop, product_id });
        if (!resuft) throw new NOT_FOUND('Product not found !');
        if (resuft == 0) throw new NO_CONTENT('Update unsuccess !');
        return resuft;
    }

    async onDraftProductForShop({
        product_shop, product_id
    }) {
        const resuft = await onDraftProductForShop({ product_shop, product_id });
        if (!resuft) throw new NOT_FOUND('Product not found !');
        if (resuft == 0) throw new NO_CONTENT('Update unsuccess !');
        return resuft;
    }

    // Query
    async findAllDrafsForShop({ product_shop, limit = 50, skip = 0 }) {
        const query = {
            product_shop: new Types.ObjectId(product_shop),
            isDraft: true
        }
        return await findAllDrafsForShop({ query, limit, skip });
    }

    async findAllPublicForShop({ product_shop, limit = 50, skip = 0 }) {
        const query = {
            product_shop: new Types.ObjectId(product_shop),
            isPublish: true
        }
        return await findAllPublicForShop({ query, limit, skip });
    }






}




class Product {
    constructor(
        {
            product_name,
            product_thumb,
            product_description,
            product_price,
            product_quantity,
            product_type,
            product_shop,
            product_attributes
        }
    ) {
        this.product_name = product_name;
        this.product_thumb = product_thumb;
        this.product_description = product_description;
        this.product_price = product_price;
        this.product_quantity = product_quantity;
        this.product_type = product_type;
        this.product_shop = product_shop;
        this.product_attributes = product_attributes;
    }

    async createProduct(idProduct) {
        return await product.create({
            ...this,
            _id: idProduct
        });
    }
}

class Clothing extends Product {
    async createProduct() {
        const clothing1 = await clothing.create({
            ...this.product_attributes,
            product_shop: this.product_shop
        });
        if (!clothing1) throw new BadRequestError('Clothing not created!');
        const newProduct = await super.createProduct(clothing1._id);
        return newProduct;
    }
}

class Electronic extends Product {
    async createProduct() {
        console.log(this);
        const electronic1 = await electronic.create({
            ...this.product_attributes,
            product_shop: this.product_shop
        });
        if (!electronic1) throw new BadRequestError('Electronic not created!');
        const newProduct = await super.createProduct(electronic1._id);
        return newProduct;
    }
}

class Furntiture extends Product {
    async createProduct() {
        console.log(this);
        const furntiture1 = await furntiture.create({
            ...this.product_attributes,
            product_shop: this.product_shop
        });
        if (!furntiture1) throw new BadRequestError('Furntiture not created!');
        const newProduct = await super.createProduct(furntiture1._id);
        return newProduct;
    }
}



// Export Factory 
ProductFactory.resgiterProduct('Electronics', Electronic);
ProductFactory.resgiterProduct('Clothing', Clothing);
ProductFactory.resgiterProduct('Furniture', Furntiture);





module.exports = new ProductFactory();

