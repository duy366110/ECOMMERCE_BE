"use strict"
// const fs = require('fs');
// const path = require('path');
// const { validationResult } = require('express-validator');
const ModelOrder = require("../../model/model.order");

class ControllerOrder {

    constructor() { }

    // LẤY VỀ SỐ LƯỢNG PRODUCT HIỆN CÓ
    getAmoutnOrder = async(req, res, next) => {
        try {
            let amountOrder = await ModelOrder.find({}).count().exec();
            res.status(200).json({
                status: true,
                message: 'Get order amout',
                amount: amountOrder
            });

        } catch (error) {
            res.status(500).json({status: false, message: 'Internal server failed'});
        }
    }

    // TRẢ VỀ THÔNG TIN PRODUCT VỚI SỐ LƯỢNG ĐƯỢC CHỈ ĐỊNH
    getLimitOrders = async(req, res, next) => {
        try {
            let { limit, start } = req.params;
            let ordersInfor = await ModelOrder.find({}).sort({data: 'desc'}).populate(['user', 'order.product']).limit(limit).skip(start).lean();
            res.status(200).json({status: true, message: 'get order successfully', orders: ordersInfor});

        } catch (error) {
            res.status(500).json({status: false, message: 'Internal server failed'});
        }
    }

}

module.exports = new ControllerOrder();