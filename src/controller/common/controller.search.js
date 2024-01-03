"use strict"
const ServiceSearch = require("../../services/service.search");

class ControllerSearch {

    constructor() { }

    // CLIENT - SEARCH SHOP PRODUCT
    async searchProductByType(req, res, next) {
        try {
            let { type, limit, start } = req.params;
            await ServiceSearch.searchProduct({type, limit, start}, (information) => {
                let { status, message, products} = information;

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

    async searchAmountCategory(req, res, next) {
        try {
            let { category } = req.params;
            await ServiceSearch.searchAmountProductByCategoryId(category, (information) => {
                let { status, message, amount} = information;

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

    // CLINET - SEARCH PRODUCT THEO GIÁ TRỊ NHẬP VÀO
    async searchProductByValueInput(req, res, next) {
        try {
            let { search } = req.body;
            await ServiceSearch.searchProductByValueInput({value: search}, (information) => {
                let { status, message, products, errors} = information;

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


}

module.exports = new ControllerSearch();