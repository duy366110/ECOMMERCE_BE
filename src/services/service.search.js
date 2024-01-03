"use strict"
const Modelproduct = require("../model/model.product");
const ServiceProduct = require("../services/service.product");
const ServiceCategory = require("../services/service.category");

class ServiceSearch {

    constructor() { }

    // SEẢCH SẢN PHẨM THEO TYPE CATEGỎY VÀ MẬT ĐỊNH
    async searchProduct(search = {}, cb) {
        try {
            let results = [];
            if(search.type === "all") {
               await ServiceProduct.getLimit(search.limit, search.start, (information) => {
                    let { status, products } = information;
                    results = status? products : [];
                })

            } else {
                await ServiceProduct.getProductByCategoryLimit(search.type, search.limit, search.start, (information) => {
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

    async searchAmountProductByCategoryId(category = "", cb) {
        try {
            cb({
                status: true,
                message: 'Search amount product successfully',
                amount: await ServiceCategory.getAmountProductByCategoryId(category)
            });

        } catch (error) {
            // PHƯƠNG THỨC LỖI
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
