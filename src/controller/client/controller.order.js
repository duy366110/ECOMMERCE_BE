"use strict"
const ModelOrder = require("../../model/model.order");
const UtilMailer = require("../../util/util.mailer");
const ServiceOrder = require("../../services/service.order");

class ControllerOrder {

    constructor() { }

    // KHÁCH HÀNG THỰC HIỆN ORDER SẢN PHẨM
    newOrder = async function(req, res, next) {
        try {
            let { user } = req;
            let { fullName, email, phone, address, coupon } = req.body;

            await ServiceOrder.create({model: user, fullName, email, phone, address, coupon}, (information) => {
                let { status, message, order, error } = information;

                if(status) {
                    req.order = order._id.toString();
                    next();

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

module.exports = new ControllerOrder();