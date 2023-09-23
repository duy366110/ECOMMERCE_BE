"use strict"
const ModelOrder = require("../../model/model.order");
const ServiceOrder = require("../../services/service.order");

class ControllerOrder {

    constructor() { }

    // TRUY XUẤT SỐ LƯỢNG ORDER
    getAmount = async(req, res, next) => {
        try {
            await ServiceOrder.getAmount((information) => {
                let { status , message, amount} = information;

                if(status) {
                    res.status(200).json({status, message, amount});

                } else {
                    res.status(406).json({status, message, error});
                }
            })

        } catch (error) {
            res.status(500).json({status: false, message: 'Internal server failed'});
        }
    }

    // TRUY XUẤT DANH MỤC ORDER
    getOrders = async(req, res, next) => {
        try {
            let { limit, start } = req.params;
            await ServiceOrder.getLimit(limit, start, (information) => {
                let { status , message, orders} = information;

                if(status) {
                    res.status(200).json({status, message, orders});

                } else {
                    res.status(406).json({status, message, error});
                }
            })

        } catch (error) {
            res.status(500).json({status: false, message: 'Internal server failed'});
        }
    }

}

module.exports = new ControllerOrder();