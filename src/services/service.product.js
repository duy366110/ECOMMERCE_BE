"use strict"
const { ObjectId } = require("mongodb");
const ModelProduct = require("../model/model.product");
const ConfigEnv = require("../configs/config.env");
const UtilCloudinary = require("../util/util.cloudinary");

class ServiceProduct {

    constructor() { }

    // LẤY DANH SÁCH PRODUCT
    async getLimit(limit, start, cb) {
        try {
            let products = await ModelProduct.find({}).sort({createDate: 'desc'}).skip(start).limit(limit).populate(['category']).lean();
            cb({status: true, message: 'Get products successfully', products});

        } catch (error) {
            // THỰC HIỆN PHƯƠNG THỨC LỖI
            cb({status: false, message: 'Method failed', error});
        }
    }

    /**
     * SEARCH PRODUCT OF CATEGORY LIMIT
     * @param {*} category 
     * @param {*} limit 
     * @param {*} start 
     * @param {*} cb 
     */
    async getProductsByCategory(category = "", limit, start, cb) {
        try {
            let products = await ModelProduct
                .find({
                    category: {
                        $eq: new ObjectId(category)
                    }
                })
                .sort({createDate: 'desc'})
                .skip(start)
                .limit(limit)
                .populate(['category'])
                .lean();
            cb({status: true, message: 'Get products successfully', products});

        } catch (error) {
            // THỰC HIỆN PHƯƠNG THỨC LỖI
            cb({status: false, message: 'Method failed', error});
        }
    }

    // TRUY XUẤT DANH SÁCH PRODUCT
    async getAll(cb) {
        try {
            let products = await ModelProduct.find({}).lean();
            cb({status: true, message: 'Get products successfully', products});

        } catch (error) {
            // THỰC HIỆN PHƯƠNG THỨC LỖI
            cb({status: false, message: 'Method failed', error});
        }
    }

    // TRUY XUẤT PRODUCT TỬ THEO ID
    async getById(id, cb) {
        try {
            let product = await ModelProduct.findById(id).populate(['category']).lean();
            cb({status: true, message: 'Get product successfully', product});

        } catch (error) {
            // THỰC HIỆN PHƯƠNG THỨC LỖI
            cb({status: false, message: 'Method failed', error});
        }
    }

    /**
     * GET AMOUNT PRODUCT
     * @returns 
     */
    async getProductAmount() {
        try {
            return await ModelProduct.find({}).count().lean();
        } catch (error) {
            return 0;
        }
    }

    // LẤY SỐ LƯỢNG PRODUCT
    async getAmount(cb) {
        try {
            let amount = await ModelProduct.find({}).count().lean();
            cb({status: true, message: 'Get amount product successfully', amount});

        } catch (error) {
            // THỰC HIỆN PHƯƠNG THỨC LỖI
            cb({status: false, message: 'Method failed', error});
        }
    }

    // TRUY XUẤT PRODUCT TỬ THEO ID
    async findProductById(id) {
        try {
            return await ModelProduct.findById(id).exec();
        } catch (error) {
            // THỰC HIỆN PHƯƠNG THỨC LỖI
            return null;
        }
    }

    // CARETE PRODUCT
    async create(product = {}, images = [], category, cb) {
        try {

            let productInfor = await ModelProduct.create({
                name: product.name,
                price: product.price, images,
                quantity: product.quantity,
                shortDes: product.shortDes,
                longDes: product.longDes, category });

            if(productInfor) {
                category.collections.push(productInfor);
                await category.save();
                cb({status: true, message: 'Create product successfully'});

            } else {
                cb({status: false, message: 'Create product unsuccessfully'});

            }

        } catch (error) {
            // THỰC HIỆN PHƯƠNG THỨC LỖI
            cb({status: false, message: 'Method failed', error});
        }
    }

    // UPDATE PRODUCT
    async update(product = {}, images = [], category, cb) {
        try {
            if(images.length) {
                for(let image of images) {
                    product.model.images.push(image);
                }
            }

            if(product.model.category._id.toString() !== category._id.toString()) {
                // XOÁ LIÊN KẾT GIỮA PRODUCT VÀ CATEGORY CŨ
                product.model.category.collections = product.model.category.collections.filter((pro) => pro.toString() !== product.model._id.toString());
                await product.model.category.save();

                // TẠO LIÊN KẾT GIỮA PRODUCT VÀ CATEGORY MỚI
                category.collections.push(product.model);
                await category.save();
                product.model.category = category;
            }

            product.model.name = product.name;
            product.model.price = product.price;
            product.model.quantity = product.quantity;
            product.model.shortDes = product.shortDes;
            product.model.longDes = product.longDes;

            await product.model.save();
            cb({status: true, message: 'Update product successfully'});

        } catch (error) {
            // THỰC HIỆN PHƯƠNG THỨC LỖI
            cb({status: false, message: 'Method failed', error});
        }
    }

    // DELETE PRODUCT
    async delete(product = {}, cb) {
        try {
            if(product.model.images.length) {
                let images = [];
                for(let image of product.model.images) {
                    let imageName = image.split('/').splice(-1).join('').split(".")[0];

                    // THUC HIEN KIEM TRA XEM FILE CO TON TAI TREN CLOUD
                    let {status, result } = await UtilCloudinary.exists(`${ConfigEnv.CLOUDINARY_DIRECTORY}/${imageName}`);
                    if(status) {
                        images.push(`${ConfigEnv.CLOUDINARY_DIRECTORY}/${imageName}`);
                    }
                }
                
                if(images.length) {
                    await UtilCloudinary.destroyMany(images);
                }
            }

            product.model.category.collections = product.model.category.collections.filter((pro) => pro.toString() !== product.model._id.toString());
            await product.model.category.save();

            await product.model.deleteOne();
            cb({status: true, message: 'Delete product successfully'});

        } catch (error) {
            // THỰC HIỆN PHƯƠNG THỨC LỖI
            cb({status: false, message: 'Method failed', error});
        }
    }

    // DELETE PHOTO PRODUCT
    async deleteProductImage(product = {}, photo = '', cb) {
        try {
            if(product.model.images.length) {
                for(let image of product.model.images) {
                    if(image === photo) {
                        let imageName = image.split('/').splice(-1).join('').split(".")[0];
                        let {status, result } = await UtilCloudinary.exists(`${ConfigEnv.CLOUDINARY_DIRECTORY}/${imageName}`);
                        if(status) {
                            await UtilCloudinary.destroy(`${ConfigEnv.CLOUDINARY_DIRECTORY}/${imageName}`);
                            break;
                        }
                    }
                }
            }
            product.model.images =  product.model.images.filter((image) => image !== photo);
            await  product.model.save();
            cb({status: true, message: 'Delete photo image successfully'});
        } catch (error) {
            // THỰC HIỆN PHƯƠNG THỨC LỖI
            cb({status: false, message: 'Method failed', error});
        }
    }
}

module.exports = new ServiceProduct();


  