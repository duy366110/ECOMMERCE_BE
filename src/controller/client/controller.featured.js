"use strict"
const ServiceFeatured = require("../../services/service.featured");

class ControllerFeatured {

    constructor() { }

    // TRUY XUẤT TẤT CẢ DANH MỤC FEATURED
    async getAllFeatured (req, res, next) {
        try {
            await ServiceFeatured.getAllFeatured((information) => {
                let { status, message, featureds } = information;
                if(status) {
                    res.status(200).json({status, message, featureds});

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

module.exports = new ControllerFeatured();