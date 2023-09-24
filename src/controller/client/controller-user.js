const ModelUser = require("../../model/model.user");
const ModelRole = require("../../model/model.role");
const Bcrypt = require("../../util/util.bcrypt");
const jwt = require("../../util/util.jwt");
const { validationResult } = require("express-validator");
const ServiceUser = require("../../services/service.user");

class ControllerUser {

    constructor() { }

    // CLIENT ĐĂNG KÝ TÀI KHOẢN
    registerAccount = async (req, res, next) => {
        try {
            let { errors } = validationResult(req);

            if(errors.length) {
                res.status(406).json({status: false, message: errors[0].msg});

            } else {
                let { fullName, email, password, phone, address } = req.body;

                // TRUY XUẤT ROLE CLIENT
                let roleInfor = await ModelRole.findOne({name: {$eq: 'Client'}});

                await ServiceUser.register({ fullName, email, password, phone, address}, roleInfor, (information) => {
                    let { status, message, user, error} = information;

                    if(status) {

                        jwt.sign({email: user.email}, (infor) => {
                            if(infor.status) {
                                res.status(200).json({
                                    status: true,
                                    message: 'Register account successfully',
                                    infor: {
                                        token: infor.token,
                                        username: user.username? user.username : '',
                                        fullname: user.fullname? user.fullname : '',
                                        email: user.email,
                                        phone: user.phonenumber? user.phonenumber : '',
                                        role: user.role.name
                                    }
                                })
    
                            } else {
                                res.status(406).json({status: true, message: 'Accept toke failed'});
                            }
                        })

                    } else {
                        res.status(406).json({status, message, error});
                    }
                })
            }
            
        } catch (error) {
            res.status(500).json({status: false, message: 'Internal server failed'});

        }
    }
    
}

module.exports = new ControllerUser();