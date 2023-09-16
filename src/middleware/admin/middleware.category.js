"use strict"
const ModelCategory = require("../../model/model.category");

class MiddlewareCategory {

    constructor() { }

    // TÌM CATEGORY THEO ID
    findCategoryById = async function(req, res, next) {
        try {
            let { category } = req.body;
            let categoryInfor = await ModelCategory.findById(category).exec();
            req.category = categoryInfor;
            next();

        } catch (error) {
            res.status(500).json({status: false, message: 'Internal server failed'});
        }
    }

}

module.exports = new MiddlewareCategory();