"use strict"
const UtilMailer = require("../../util/util.mailer");
const MoldelOrder = require("../../model/model.order");

class ControllerMainler {

    constructor() { }

    // GỬI THÔNG TIN ĐẾN KHÁCH HÀNG SAU KHI ỎDẺ SẢN PHẨM
    async sendMailToClientAfterOrder(req, res, next) {
        try {

            let { order } = req;

            let orderInfor = await MoldelOrder.findById(order).populate(['order.product']).lean();
            let template = UtilMailer.transactionTemplate(orderInfor);

            UtilMailer.send(orderInfor.email, template,  (information) => {
                let { status, infor } = information;
                req.statusMailer = status;
                next();

            })

        } catch (error) {
            // PHƯƠNG THỨC LỖI
            res.status(500).json({status: false, message: 'Internal server failed'});
        }
    }

    // THÔNG BÁO ĐẾN KHÁCH HÀNG SEND MAIL THÀNH CÔNG
    async notificationAfterSendMailOrder(req, res, next) {
        let { statusMailer } = req;
        if(statusMailer) {
            res.status(200).json({status: true, message: 'Send information user order successfully'});

        } else {
            res.status(406).json({status: false, message: 'Send information user order product failed'});

        }
    }
}

module.exports = new ControllerMainler();