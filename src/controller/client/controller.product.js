"use strict"
const ModelProduct = require("../../model/model.product");

class ControllerProduct {

    constructor() { }

    // LẤY VỀ SỐ LƯỢNG PRODUCT HIỆN CÓ
    getAmoutnProduct = async function (req, res, next) {
        try {
            let amountProduct = await ModelProduct.find({}).count().lean();
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
    getLimitProducts = async function (req, res, next) {
        try {
            let { limit, start } = req.params;
            let productsInfor = await ModelProduct.find({}).populate(['category']).limit(limit).skip(start).lean();
            res.status(200).json({status: true, message: 'Find products successfully', products: productsInfor});

        } catch (error) {
            res.status(500).json({status: false, message: 'Internal server failed'});
        }
    }

    // TIMG KIẾM PRODUCT THÔNG QUA ID
    getProductById = async function (req, res, next) {
        try {
            let { product } = req.params;
            let productInfor = await ModelProduct.findById(product).populate(['category']).lean();
            res.status(200).json({status: true, message: 'Fiind product successfully', product: productInfor});

        } catch (error) {
            // PHƯƠNG THỨC LỖI
            res.status(500).json({status: false, message: 'Internal server failed'});

        }
    }

}

module.exports = new ControllerProduct();