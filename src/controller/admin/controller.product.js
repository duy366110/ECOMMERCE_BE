"use strict"
const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const ModelProduct = require("../../model/model.product");

class ControllerProduct {

    constructor() { }

    // LẤY VỀ SỐ LƯỢNG PRODUCT HIỆN CÓ
    getAmoutnProduct = async(req, res, next) => {
        try {
            let amountProduct = await ModelProduct.find({}).count().exec();
            res.status(200).json({
                status: true,
                message: 'Get product amout',
                amount: amountProduct
            });

        } catch (error) {
            res.status(500).json({status: false, message: 'Internal server failed'});
        }
    }

    // TRẢ VỀ THÔNG TIN PRODUCT VỚI SỐ LƯỢNG ĐƯỢC CHỈ ĐỊNH
    getLimitProducts = async(req, res, next) => {
        try {
            let { limit, start } = req.params;
            let productsInfor = await ModelProduct.find({}).populate(['category']).limit(limit).skip(start).exec();
            res.status(200).json({status: true, message: 'Find products successfully', products: productsInfor});

        } catch (error) {
            res.status(500).json({status: false, message: 'Internal server failed'});
        }
    }

    // TIMG KIẾM PRODUCT THÔNG QUA ID
    getProductById = async (req, res, next) => {
        try {
            let { product } = req.params;
            let productInfor = await ModelProduct.findById(product).populate(['category']).lean();
            res.status(200).json({status: true, product: productInfor});

        } catch (error) {
            res.status(500).json({status: false, message: 'Internal server failed'});

        }
    }

    // ADMIN TẠO MỚI TÀI KHOẢN
    createProduct = async function (req, res, next) {
        const { errors } = validationResult(req);

        try {
            if(errors.length) {
                res.status(406).json({status: false, message: errors[0].msg});
                
            } else {
                let { files } =  req;
                let { category } = req;
                let { name, price, quantity, shortDes, longDes } = req.body;

                // LẤY THÔNG TIN DANH SÁCH HÌNH ẢNH CATEGORY.
                let paths = [];
                if(files.length) {
                    paths = files.map((image) => {
                        return `images/${image.filename}`;
                    })
                }

                // MÃ HOÁ MẬT KHẨU VÀ TẠO MỚI USER.
                let productInfor = await ModelProduct.create({ name, price, images: paths, quantity, shortDes, longDes, category })

                if(productInfor) {
                    // THỰC HIỆN TẠO LIÊN KẾT GIỮA PRODUCT VÀ CATEGORY
                    category.collections.push(productInfor);
                    await category.save();
                    res.status(200).json({status: true, message: 'Create product successfully'});

                } else {
                    res.status(406).json({status: false, message: 'Create product failed'});

                }
            }

        } catch (error) {
            res.status(500).json({status: false, message: 'Internal server failed'});

        }
    }

    // ADMIN SỬA THÔNG TIN TÀI KHOẢN
    modifiProduct = async function(req, res, next) {
        let { errors } = validationResult(req);

        if(errors.length) {
            res.status(406).json({status: false, message: errors[0].msg});

        } else {
            try {
                let { files } =  req;
                let { category } = req;
                let { product, name, price, quantity, shortDes, longDes } = req.body;

                let productInfor = await ModelProduct.findById(product).populate(['category']).exec();

                // KIỂM TRA ADMIN CÓ CẬP NHẬT ROLE CỦA SẢN PHẨM HAY KHÔNG
                if(productInfor.category._id.toString() !== category._id.toString()) {
                    // XOÁ LIÊN KẾT GIỮA PRODUCT VÀ CATEGORY CŨ
                    productInfor.category.collections = productInfor.category.collections.filter((pro) => pro.toString() !== productInfor._id.toString());
                    await productInfor.category.save();

                    // TẠO LIÊN KẾT GIỮA PRODUCT VÀ CATEGORY MỚI
                    category.collections.push(productInfor);
                    await category.save();
                    productInfor.category = category;
                }

                // THỰC HIỆN CẬP NHẬT ẢNH MỚI CHO SẢN PHẨM
                if(files.length) {
                    for(let image of files) {
                        productInfor.images.push(`images/${image.filename}`);
                    }
                }

                // CẬP THÔNG TIN CƠ SỞ CỦA PRODUCT
                productInfor.name = name;
                productInfor.price = price;
                productInfor.quantity = quantity;
                productInfor.shortDes = shortDes;
                productInfor.longDes = longDes;
                await productInfor.save();

                // GỬI TRẢ TRẠNG THÁI VỀ NGƯỜI DÙNG
                res.status(200).json({status: true, message: 'Modifi product information successfully'});

            } catch (error) {
                // PHUONG THỨC LỖI
                res.status(500).json({status: false, message: 'Internal server failed'});

            }
        }
    }

    //  ADMIN XOÁ TÀI KHOẢN
    deleteProduct = async (req, res, next) => {
        let { errors } = validationResult(req);                                                                                                

        if(errors.length) {
            res.status(406).json({staus: false, message: errors[0].msg});

        } else {
            try {
                let { product } = req.body;
                let productInfor = await ModelProduct.findById(product).populate(['category']).exec();                

                // THỰC HIỆN XOÁ LIÊN KẾT GIỮA PRODUCT VÀ CATEGORY
                productInfor.category.collections = productInfor.category.collections.filter((pro) => pro.toString() !== product);
                await productInfor.category.save();

                if(productInfor.images) {
                    for(let image of productInfor.images ) {

                        let photoPath = path.join(__dirname, "../../", "public", image);
                        let status  = fs.existsSync(photoPath);
                        if(status) {
                            fs.unlinkSync(photoPath);
                        }
                    }
                }

                // TIẾN HÀNH XOÁ PRODUCT
                await productInfor.deleteOne();

                // XOÁ PRODUCT THÀNH CÔNG
                res.status(200).json({status: true, message: 'Delete product successfully'});
    
            } catch (error) {
                // PHƯƠNG THỨC LỖI
                res.status(500).json({status: false, message: 'Internal server failed'});
            }
        }
    }

     // ADMIN XOÁ ẢNH CATEGORY
     deletePhoto = async function (req, res, next) {
        let { errors } = validationResult(req);

        if(errors.length) {
            res.status(406).json({status: false, message: errors[0].msg});

        } else {
            try {

                let { id, photo } = req.body;
                let productInfor = await ModelProduct.findById(id).exec();
    
                let photoPath = path.join(__dirname, "../../", "public", photo);
    
                // KIỂM TRA ẢNH CÓ TỒN TẠI THỰC HIỆN XOÁ
                let imageExists = fs.existsSync(photoPath);
                if(imageExists) {
                    fs.unlinkSync(photoPath);
                }
    
                // THỰC HIỆN XOÁ ẢNH TRONG MODEL
                productInfor.images = productInfor.images.filter((image) => image !== photo);
                await productInfor.save();
                res.status(200).json({status: true, messgae: 'Delete photo product successfully'});
    
    
            } catch (error) {
                // PHƯƠNG THỨC LỖI
                res.status(500).json({status: false, message: 'Internal server failed'});
            }
        }
    }

}

module.exports = new ControllerProduct();