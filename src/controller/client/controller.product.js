"use strict"
const ModelProduct = require("../../model/model.product");
const ServiceProduct = require("../../services/service.product");

class ControllerProduct {

    constructor() { }

    // TRUY XUẤT SỐ LƯỢNG PRODUCT
    async getAmount(req, res, next) {
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

    // TRUY XUẤT DANH SÁCH SẢN PHẨM
    async getProducts(req, res, next) {
        try {
            let { limit, start } = req.params;
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

    // TRUY XUẤT SẢN PHẨM THEO ID
    async getProductById(req, res, next) {
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

}

module.exports = new ControllerProduct();