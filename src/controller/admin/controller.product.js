"use strict"
const { validationResult } = require('express-validator');
const ModelProduct = require("../../model/model.product");
const ServiceProduct = require("../../services/service.product");

class ControllerProduct {

    constructor() { }

    // TRUY XUẤT DANH MỤC PRODUCT
    async getProducts(req, res, next) {
        try {
            let { limit, start} = req.params;
            await ServiceProduct.getLimit(limit, start, (information) => {
                let { status , message, products} = information;

                if(status) {
                    res.status(200).json({status, message, products});

                } else {
                    res.status(406).json({status, message, error});
                }
            })

        } catch (error) {
            // PHƯƠNG THỨC LỖI
            res.status(500).json({status: false, message: 'Internal server failed'});
        }
    }

    // TRUY XUẤT TẤT CẢ DANH MỤC PRODUCT
    async getProductsAll (req, res, next) {
        try {
            await ServiceProduct.getAll((information) => {
                let { status, message, products } = information;
                if(status) {
                    res.status(200).json({status, message, products});

                } else {
                    res.status(406).json({status, message, error});
                }
            })

        } catch (error) {
            // PHƯƠNG THỨC LỖI
            res.status(500).json({status: false, message: 'Internal server failed'});
        }
    }

    // TRUY XUẤT PRODUCT THEO ID
    getProductById = async (req, res, next) => {
        try {
            let { product } = req.params;
            await ServiceProduct.getById(product, (information) => {
                let { status, message, product, error } = information;
                if(status) {
                    res.status(200).json({status, message, product});

                } else {
                    res.status(406).json({status, message, error});
                }
            })

        } catch (error) {
            // PHƯƠNG THỨC LỖI
            res.status(500).json({status: false, message: 'Internal server failed'});

        }
    }

    // TRUY XUẤT SỐ LƯỢNG PRODUCT HIỆN CÓ
    getAmount = async (req, res, next) => {
        try {
            await ServiceProduct.getAmount((information) => {
                let { status , message, amount} = information;

                if(status) {
                    res.status(200).json({status, message, amount});

                } else {
                    res.status(406).json({status, message, error});
                }
            })
        } catch (error) {
            // PHƯƠNG THỨC LỖI
            res.status(500).json({status: false, message: 'Internal server failed'});
        }
    }

    // CREATE PRODUCT
    createProduct = async function (req, res, next) {
        const { errors } = validationResult(req);

        try {
            if(errors.length) {
                res.status(406).json({status: false, message: errors[0].msg});
                
            } else {
                let { files } =  req;
                let { category } = req;
                let { name, price, quantity, shortDes, longDes } = req.body;

                // LẤY THÔNG TIN DANH SÁCH HÌNH ẢNH PRODUCT
                let images = [];
                if(files.length) {
                    images = files.map((image) => {
                        return image.path? image.path : '';
                    })
                }

                // TẠO MỚI THÔNG TIN PRODUCT
                await ServiceProduct.create({ name, price, images, quantity, shortDes, longDes }, images, category, (information) => {
                    let { status, message, error } = information;
                    if(status) {
                        res.status(200).json({status: true, message});

                    } else {
                        res.status(406).json({status: false, message, error});
                    }
                })
            }

        } catch (error) {
            res.status(500).json({status: false, message: 'Internal server failed'});

        }
    }

    // UPDATE PRODUCT
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

                // LẤY THÔNG TIN DANH SÁCH HÌNH ẢNH CATEGORY
                let images = [];
                if(files.length) {
                    images = files.map((image) => {
                        return image.path? image.path : '';
                    })
                }

                await ServiceProduct.update({model: productInfor, name, price, quantity, shortDes, longDes}, images, category, (information) => {
                    let { status, message, error} = information;

                    if(status) {
                        res.status(200).json({status: true, message});

                    } else {
                        res.status(406).json({status: false, message, error});
                    }
                })

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
                await ServiceProduct.delete({model: productInfor}, (information) => {
                    let { status, message, error} = information;

                    if(status) {
                        res.status(200).json({status: true, message});

                    } else {
                        res.status(406).json({status: false, message, error});
                    }
                })
                
            } catch (error) {
                // PHƯƠNG THỨC LỖI
                res.status(500).json({status: false, message: 'Internal server failed'});
            }
        }
    }

     // ADMIN XOÁ ẢNH PRODUCT
     deletePhoto = async function (req, res, next) {
        let { errors } = validationResult(req);

        if(errors.length) {
            res.status(406).json({status: false, message: errors[0].msg});

        } else {
            try {

                let { id, photo } = req.body;
                let productInfor = await ModelProduct.findById(id).exec();

                await ServiceProduct.deleteImage({model: productInfor}, photo, (information) => {
                    let { status, message, error } = information;
                    if(status) {
                        res.status(200).json({status: true, message});

                    } else {
                        res.status(406).json({status: false, message, error});
                    }
                })
    
    
            } catch (error) {
                // PHƯƠNG THỨC LỖI
                res.status(500).json({status: false, message: 'Internal server failed'});
            }
        }
    }

}

module.exports = new ControllerProduct();