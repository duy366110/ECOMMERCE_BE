const ModelUser = require("../../model/model.user");
const { validationResult } = require('express-validator');
const jwt = require("../../util/util.jwt");
const bcrypt = require("../../util/util.bcrypt");
const ServiceUser = require("../../services/service.user");

class ControllerAuth {

    constructor() { }

    //  XAC STHCỰ TÀI KHOẢN QUẢN TRỊ
    async signinManager(req, res, next) {
        try {
            let { errors } = validationResult(req);

            if(errors.length) {
                res.status(406).json({status: false, message: errors[0].msg});

            } else {

                let { email, password } = req.body;
                await ServiceUser.findByEmail(email, (information) => {
                    let { status, message, user } = information;

                    if(status) {
                        bcrypt.compare(password, user.password, (infor) => {
                            if(infor.status) {
                                jwt.sign({email: user.email}, (infor) => {
                                    if(infor.status) {
                                        res.status(200).json({
                                            status: true,
                                            message: 'Sign In successfully',
                                            infor: {
                                                id: user._id,
                                                token: infor.token,
                                                username: user.username,
                                                fullname: user.fullname,
                                                phone: user.phonenumber,
                                                addres: user.address,
                                                role: user.role.name,
                                            }
                                        })
    
                                    } else {
    
                                    }
                                })
    
                            } else {
                                res.status(406).json({status: false,  message: 'Password incorrect'});
                            }
                        })

                    } else {
                        res.status(406).json({status: false,  message: 'Signin token failed'});
                    }
                })
            }
            
        } catch (error) {
            res.status(500).json({status: false, message: 'Internal server failed'});
        }
    }

    // XÁC THỰC TÀI KHOẢN CLIENT
    async signinClient(req, res, next) {
        try {
            let { email, password } = req.body;
            let { errors } = validationResult(req);

            if(errors.length) {
                res.status(406).json({status: false, message: errors[0].msg});

            } else {

                await ServiceUser.findByEmail(email, (information) => {
                    let { status, message, user } = information;
                    if(status) {

                        bcrypt.compare(password, user.password, (infor) => {
                            if(infor.status) {
                                jwt.sign({email: user.email}, (infor) => {
                                    if(infor.status) {
                                        res.status(200).json({
                                            status: true,
                                            message: 'Signin successfully',
                                            infor: {
                                                id: user._id,
                                                token: infor.token,
                                                username: user.username,
                                                fullname: user.fullname,
                                                email: user.email,
                                                phone: user.phonenumber,
                                                address: user.address,
                                                role: user.role.name,
                                            }
                                        })
        
                                    } else {
        
                                    }
                                })
        
                            } else {
                                res.status(406).json({status: false,  message: 'Password incorrect'});
                            }
                        })

                    } else {
                        res.status(404).json({status: false, message: 'Not found user account'});
                    }
                })

            }
            
        } catch (error) {
            res.status(500).json({status: true, message: 'Internal server failed'});

        }
    }
}

module.exports = new ControllerAuth();