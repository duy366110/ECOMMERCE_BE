"use strict"
const ModelOrder = require("../../model/model.order");
const ServiceOrder = require("../../services/service.order");

class ControllerOrder {

    constructor() { }

    /**
     * Get amount order
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
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

    
    /**
     * Get information amount and total all order
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async getInformation(req, res, next) {
        try {
            await ServiceOrder.getInformation((information) => {
                let { status , message, amount, total} = information;

                if(status) {
                    res.status(200).json({status, message, amount, total});

                } else {
                    res.status(406).json({status, message, error});
                }
            })
        } catch (error) {
            res.status(500).json({status: false, message: 'Internal server failed'});
        }
    }

    /**
     * Get information limit not amount and total
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
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