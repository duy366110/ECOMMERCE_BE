"use strict";
const mongodb = require("mongodb");
const ModelOrder = require("../../model/model.order");
const ObjectId = mongodb.ObjectId;

class ControllerTransaction {

    constructor() { }

    // KHÁCH HÀNG TRUY CẬP DANH SÁCH THÔNG TIN GIAO DỊCH
    getTransaction = async function(req, res, next) {
        try {
            let { user } = req;
            
            let ordersInfor = await ModelOrder.find({user: {$eq: user._id}}).populate(['order.product']).lean();
            res.status(200).json({status: true, message: 'Find transaction of user successfully', transactions: ordersInfor});


        } catch (error) {
            // PHƯƠNG THỨC LỖI
            res.status(500).json({status: false, message: 'Internal server failed'});
        }
    }

}

module.exports = new ControllerTransaction();