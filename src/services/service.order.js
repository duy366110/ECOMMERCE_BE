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


    /**
     * Get information order amount and total all order.
     * @param {*} cb 
     */
    async getInformation(cb) {
        try {
            let orders = await ModelOrder.find({}).sort({data: 'desc'}).populate(['order.product']).lean();
            let amount = orders.length;
            let total = 0;

            if(amount) {
                orders.forEach((elm) => {
                    total = elm.order.reduce((acc, infor) => {
                            return acc += Number(infor.quantity) * Number(infor.product.price);
                        }, 0).toFixed(6)
                 })
            }

            cb({status: true, message: 'Get information successfully', amount, total});

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

    // TẠO MỚI ORDER
    async create(user = {}, cb) {
        try {
            let orderInfor = await ModelOrder.create({
                user: user.model, 
                fullName: user.fullName,
                email: user.email,
                phone: user.phone,
                address: user.address,
                coupon: user.coupon,
                order: user.model.cart
            });

            // THỰC HIỆN TẠO LIÊN KẾT THÔNG TIN ĐƠN HÀNG VÀO USER ACCOUNT
            user.model.cart = user.model.cart.map((cartItem) => null).filter((cartItem) => cartItem);
            user.model.order.push(orderInfor);
            await user.model.save();

            cb({status: true, message: 'Create order done', order: orderInfor});

        } catch (error) {
            // THỰC HIỆN PHƯƠNG THỨC LỖIs
            cb({status: false, message: 'Method failed', error});
        }
    }

}

module.exports = new ServiceOrder();