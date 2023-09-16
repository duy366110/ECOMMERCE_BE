const ModelUser = require('../../model/model.user');
const JWT = require("../../util/util.jwt");

// ÁP DỤNG ROUTER PHÍA CLIENT
class MiddlewareUser {

    constructor() { }

    // PHƯƠNG THỨC TÌM USER THÔNG QUA TOKEN
    findUserByToken = async function(req, res, next) {
        try {
            let authorization = req.get("authorization");

            if(authorization) {
                authorization = authorization.replace('Bearer ', '');
                JWT.verify(authorization.trim(), async (information) => {
                    let { status, message, infor } = information;

                    if(status) {
                        let userInfor = await ModelUser.findOne({email: {$eq: infor.email}}).populate(['cart.product']).exec();
                        req.user = userInfor;
                        next();

                    } else {
                        // TOKEN KHÔNG HỢP LỆ
                        res.status(406).json({status: false, message: 'Token invalid'});
                    }
                })

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

module.exports = new MiddlewareUser();