"use strict"
const ModelOrder = require("../../model/model.order");
const UtilMailer = require("../../util/util.mailer");

class ControllerOrder {

    constructor() { }

    // KHÁCH HÀNG THỰC HIỆN ORDER SẢN PHẨM
    newOrder = async function(req, res, next) {
        try {
            let { user } = req;
            let { fullName, email, phone, address, coupon } = req.body;

            let orderInfor = await ModelOrder.create({user, fullName, email, phone, address, coupon, order: user.cart });

            // THỰC HIỆN TẠO LIÊN KẾT THÔNG TIN ĐƠN HÀNG VÀO USER ACCOUNT
            user.cart = user.cart.map((cartItem) => null).filter((cartItem) => cartItem);
            user.order.push(orderInfor);
            await user.save();

            req.order = orderInfor._id.toString();
            next();


        } catch (error) {
            // PHƯƠNG THỨC LỖI
            res.status(500).json({status: false, message: 'Internal server failed'});
        }
    }
}

module.exports = new ControllerOrder();