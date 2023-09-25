"use strict"
const ModelCategory = require("../model/model.category");
const Modelproduct = require("../model/model.product");

class ServiceSearch {

    constructor() { }

    // SEẢCH SẢN PHẨM THEO TYPE CATEGỎY VÀ MẬT ĐỊNH
    async searchProduct(search = {}, cb) {
        try {
            let products = null;
            if(search.type === 'all') {
                products = await Modelproduct.find({}).limit(search.limit).skip(search.start).sort({createDate: 'desc'}).lean();

            } else {
                let categories = await ModelCategory.findById(search.type).sort({createDate: 'desc'}).populate(['collections']).lean();
                products = categories.collections;
            }

            cb({status: true, message: 'Search product by category successfully', products});

        } catch (error) {
            // PHƯƠNG THỨC LỖI
            cb({status: false, message: 'Method failed', error});
        }
    }

    // SEARCH SẢN PHẨM GIÁ TRỊ SEARCH KHÁCH HÀNG
    async searchProductByValueInput(search, cb) {
        try {
            let products = await Modelproduct.find({name: { $regex: `.*${search.value}.*`}}).lean();
            cb({status: true, message: 'Search products successfully', products});

        } catch (error) {
            // PHƯƠNG THỨC LỖI
            cb({status: false, message: 'Method failed', error});
        }
    }

}

module.exports = new ServiceSearch();
