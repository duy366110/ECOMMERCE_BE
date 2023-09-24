"use strict"
// const ModelCategory = require("../../model/model.category");
const ServiceCategory = require("../../services/service.category");

class ControllerCategory {

    constructor() { }

    // TRUY XUẤT DANH SÁCH CATEGORY
    async getCategoryAll( req, res, next) {
        try {
            await ServiceCategory.getAll((information) => {
                let { status , message, categories} = information;

                if(status) {
                    res.status(200).json({status, message, categories});

                } else {
                    res.status(406).json({status, message, error});
                }
            })

        } catch (error) {
            // PHƯƠNG THỨC LỖI
            res.status(500).json({status: false, message: 'Internal server failed'});
        }
    }

    // TRUY XUẤT CATEGORY THEO ID
    async getCategoryById(req, res, next) {
        try {
            let { category } = req.params;
            await ServiceCategory.getById(category, (information) => {
                let { status, message, category, error } = information;
                if(status) {
                    res.status(200).json({status, message, category});

                } else {
                    res.status(406).json({status, message, error});
                }
            })

        } catch (error) {
            res.status(500).json({status: false, message: 'Internal server failed'});

        }
    }
}

module.exports = new ControllerCategory();