"use strict"
const ModelOrder = require("../model/model.order");

class ServiceOrder {

    constructor() { }

    // LẤY DANH SÁCH ORDER
    async getLimit(limit, start, cb) {
        try {
            let orders = await ModelOrder.find({}).sort({data: 'desc'}).populate(['user', 'order.product']).limit(limit).skip(start).lean();
            cb({status: true, message: 'Get orders successfully', orders});

        } catch (error) {
            // THỰC HIỆN PHƯƠNG THỨC LỖI
            cb({status: false, message: 'Method failed', error});
        }
    }

    // LẤY SỐ LƯỢNG ORDER
    async getAmount(cb) {
        try {
            let amount = await ModelOrder.find({}).count().lean();
            cb({status: true, message: 'Get amount role successfully', amount});

        } catch (error) {
            // THỰC HIỆN PHƯƠNG THỨC LỖI
            cb({status: false, message: 'Method failed', error});
        }
    }

}

module.exports = new ServiceOrder();


  