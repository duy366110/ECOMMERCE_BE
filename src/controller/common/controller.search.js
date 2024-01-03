"use strict"
const ServiceSearch = require("../../services/service.search");

class ControllerSearch {

    constructor() { }

    /**
     * SEARCH PRODUCT BY TYPE CATEGORY AND LIMIT
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async searchProductByTypeCategory(req, res, next) {
        try {
            let { type, limit, start } = req.params;
            await ServiceSearch.searchProductByTypeCategory({type, limit, start}, (information) => {
                let { status, message, products} = information;

                if(status) {
                    return res.status(200).json({status, message, products});

                } else {
                    return res.status(406).json({status, message, error});
                }
            })

        } catch (error) {
            // PHƯƠNG THỨC LỖI
            res.status(500).json({status: false, message: 'Internal server failed'});
        }
    }

    
    /**
     * SEARCH AMOUNT PRODUCT BY TYPE CATEGORY
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async searchAmountProductByCategory(req, res, next) {
        try {
            let { category } = req.query;
            await ServiceSearch.searchAmountProductByCategoryId(category, (information) => {
                let { status, message, amount} = information;

                if(status) {
                    return res.status(200).json({status, message, amount});

                } else {
                    return res.status(406).json({status, message, error});
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