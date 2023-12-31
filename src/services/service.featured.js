"use strict"
const ModelFeatured = require("../model/model.featured");
const ConfigEnv = require("../configs/config.env");
const UtilCloudinary = require("../util/util.cloudinary");

class ServiceFeatured {

    constructor() { }

    // LẤY DANH SÁCH FEATURED
    async getLimit(limit, start, cb) {
        try {
            let featureds = await ModelFeatured.find({}).sort({createDate: 'desc'}).limit(limit).skip(start).lean();
            cb({status: true, message: 'Get featured successfully', featureds});

        } catch (error) {
            // THỰC HIỆN PHƯƠNG THỨC LỖI
            cb({status: false, message: 'Method failed', error});
        }
    }

    // TRUY XUẤT DANH SÁCH CATEGORY
    async getAll(cb) {
        // try {
        //     let categories = await ModelCategory.find({}).lean();
        //     cb({status: true, message: 'Get categories successfully', categories});

        // } catch (error) {
        //     // THỰC HIỆN PHƯƠNG THỨC LỖI
        //     cb({status: false, message: 'Method failed', error});
        // }
    }

    // TRUY XUẤT CATEGORY TỬ THEO ID
    async getById(id, cb) {
        // try {
        //     let category = await ModelCategory.findById(id).populate(['collections']).lean();
        //     cb({status: true, message: 'Get category successfully', category});

        // } catch (error) {
        //     // THỰC HIỆN PHƯƠNG THỨC LỖI
        //     cb({status: false, message: 'Method failed', error});
        // }
    }

    // LẤY SỐ LƯỢNG FEATURED
    async getAmount(cb) {
        try {
            let amount = await ModelFeatured.find({}).count().lean();
            cb({status: true, message: 'Get amount featured successfully', amount});

        } catch (error) {
            // THỰC HIỆN PHƯƠNG THỨC LỖI
            cb({status: false, message: 'Method failed', error});
        }
    }

    // CARETE FEATURED
    async createFeatured(featured = {}, images, cb) {
        try {
            await ModelFeatured.create({
                title: featured.title,
                desc: featured.des,
                images,
                titleColor: featured.color
            });
            cb({status: true, message: 'Create featured successfully'});

        } catch (error) {
            // THỰC HIỆN PHƯƠNG THỨC LỖI
            cb({status: false, message: 'Method failed', error});
        }
    }

    // UPDATE CATEGORY
    async update(category = {}, images = [], cb) {
        // try {
        //     if(images.length) {
        //         for(let image of images) {
        //             category.model.images.push(image);
        //         }
        //     }

        //     category.model.title = category.title;
        //     category.model.updateDate = new Date();
        //     await category.model.save();

        //     cb({status: true, message: 'Update category successfully'});


        // } catch (error) {
        //     // THỰC HIỆN PHƯƠNG THỨC LỖI
        //     cb({status: false, message: 'Method failed', error});
        // }
    }

    // DELETE CATEGORY
    async delete(category = {}, cb) {
        // try {
        //     if(category.model.images.length) {
        //         let images = [];
        //         for(let image of category.model.images) {
        //             let imageName = image.split('/').splice(-1).join('').split(".")[0];

        //             // THUC HIEN KIEM TRA XEM FILE CO TON TAI TREN CLOUD
        //             let {status, result } = await UtilCloudinary.exists(`${ConfigEnv.CLOUDINARY_DIRECTORY}/${imageName}`);
        //             if(status) {
        //                 images.push(`${ConfigEnv.CLOUDINARY_DIRECTORY}/${imageName}`);
        //             }
        //         }
                
        //         if(images.length) {
        //             await UtilCloudinary.destroyMany(images);
        //         }
        //     }

        //     await category.model.deleteOne();
        //     cb({status: true, message: 'Delete category successfully'});

        // } catch (error) {
        //     // THỰC HIỆN PHƯƠNG THỨC LỖI
        //     cb({status: false, message: 'Method failed', error});
        // }
    }

    // DELETE PHOTO CATEGORY
    async deleteImage(category = {}, photo = '', cb) {
        // try {
        //     // KIỂM TRA ẢNH CÓ TỒN TẠI THỰC HIỆN XOÁ
        //     if(category.model.images.length) {

        //         for(let image of category.model.images) {
        //             if(image === photo) {
        //                 let imageName = image.split('/').splice(-1).join('').split(".")[0];

        //                 // THỰC HIỆN KIỂM TRA XEM FILE TỒN TẠI VÀ XOÁ FILE CLOUD
        //                 let {status, result } = await UtilCloudinary.exists(`${ConfigEnv.CLOUDINARY_DIRECTORY}/${imageName}`);
        //                 if(status) {
        //                     await UtilCloudinary.destroy(`${ConfigEnv.CLOUDINARY_DIRECTORY}/${imageName}`);
        //                     break;
        //                 }
        //             }
        //         }
        //     }

        //     // THỰC HIỆN XOÁ FILE TRONG DB
        //      category.model.images =  category.model.images.filter((image) => image !== photo);
        //     await  category.model.save();

        //     cb({status: true, message: 'Delete photo image successfully'});

        // } catch (error) {
        //     // THỰC HIỆN PHƯƠNG THỨC LỖI
        //     cb({status: false, message: 'Method failed', error});
        // }
    }
}

module.exports = new ServiceFeatured();


  