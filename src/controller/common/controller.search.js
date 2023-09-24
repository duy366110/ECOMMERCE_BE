"use strict"
const ServiceSearch = require("../../services/service.search");

class ControllerSearch {

    constructor() { }

    // CLIENT - SEARCH SHOP PRODUCT
    async searchProductByType(req, res, next) {
        try {
            let { type } = req.params;
            await ServiceSearch.searchProduct({category: type}, (information) => {
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
}

module.exports = new ControllerSearch();