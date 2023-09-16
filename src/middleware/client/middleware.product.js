const ModelProduct = require('../../model/model.product');

// ÁP DỤNG ROUTER PHÍA CLIENT
class MiddlewareProduct {

    constructor() { }

    // PHƯƠNG THỨC TÌM USER THÔNG QUA TOKEN
    findProductById = async function(req, res, next) {
        try {
            let { product } = req.body;
            let productInfor = await ModelProduct.findById(product).exec();

            if(productInfor) {
                req.product = productInfor;
                next();

            } else {
                 // KKHÔNG TÌM THẤY TOKEN
                 res.status(404).json({status: false, message: 'not found token'});
            }

        } catch (error) {
            // PHƯƠNG THỨC LỖI
            res.status(500).json({status: false, message: 'Internal server failed'});
        }
    }
}

module.exports = new MiddlewareProduct();