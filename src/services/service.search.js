"use strict"
const Modelproduct = require("../model/model.product");
const ServiceProduct = require("../services/service.product");
const ServiceCategory = require("../services/service.category");

class ServiceSearch {

    constructor() { }

    /**
     * SEARCH PRODUCT BY TYPE CATEGORY AND LIMIT
     * @param {*} search 
     * @param {*} cb 
     */
    async searchProductByTypeCategory(search = {}, cb) {
        try {
            let results = [];
            if(search.type === "all") {
               await ServiceProduct.getLimit(search.limit, search.start, (information) => {
                    let { status, products } = information;
                    results = status? products : [];
                })

            } else {
                await ServiceProduct.getProductsByCategory(search.type, search.limit, search.start, (information) => {
                    let { status, products } = information;
                    results = status? products : [];
                })
            }

            cb({status: true, message: 'Search product by category successfully', products: results});

        } catch (error) {
            // PHƯƠNG THỨC LỖI
            cb({status: false, message: 'Method failed', error});
        }
    }

    
    /**
     * SEARCH AMOUNT PRODUCT BY CATEGORY TYPE
     * @param {*} category 
     * @param {*} cb 
     */
    async searchAmountProductByCategoryId(category = "", cb) {
        try {
            let amount = category === "all" ? await ServiceProduct.getProductAmount() : await ServiceCategory.getAmountProductByCategoryId(category);
            cb({status: true, message: 'Search amount success', amount});
        } catch (error) {
            cb({status: false, message: 'Method failed', error});
        }
    }

    // SEARCH SẢN PHẨM GIÁ TRỊ SEARCH KHÁCH HÀNG
    async searchProductByValueInput(search, cb) {
        try {
            let products = await Modelproduct
            .find(
                {
                    $text: {
                        $search: search.value
                    }
                },
                {
                    score: {
                        $meta: "textScore"
                    }
                })
            .sort({score: {$meta: 'textScore'}})
            .lean();
            cb({status: true, message: 'Search products successfully', products});

        } catch (error) {
            // PHƯƠNG THỨC LỖI
            cb({status: false, message: 'Method failed', error});
        }
    }

}

module.exports = new ServiceSearch();
