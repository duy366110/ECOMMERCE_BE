"use strict"
const ModelCategory = require("../../model/model.category");

class ControllerCategory {

    constructor() { }

    // LẤY DANH SÁCH TẤT CẢU LOCATION
    getCategory = async( req, res, next) => {
        try {
            let categoryInfor = await ModelCategory.find({}).lean();
            res.status(200).json({
                status: true,
                message: "Get location done",
                categories: categoryInfor
            })

        } catch (error) {
            // PHƯƠNG THỨC LỖI
            res.status(500).json({status: false, message: 'Internal server failed'});
        }
    }

    // TÌM KIẾM CATEGORY THÔNG QUA ID
    getCategoryById = async function (req, res, next) {
        try {
            let { category } = req.params;
            let categoriesInfor = await ModelCategory.findById(category).populate(['collections']).lean();
            res.status(200).json({status: true, message: 'Fiind category successfully', category: categoriesInfor});

        } catch (error) {
            res.status(500).json({status: false, message: 'Internal server failed'});

        }
    }
}

module.exports = new ControllerCategory();