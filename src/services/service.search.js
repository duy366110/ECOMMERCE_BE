"use strict"
const ModelCategory = require("../model/model.category");
const Modelproduct = require("../model/model.product");

class ServiceSearch {

    constructor() { }

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

}

module.exports = new ServiceSearch();
