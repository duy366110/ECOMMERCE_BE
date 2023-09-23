const ModelUser = require("../../model/model.user");
const ModelRole = require("../../model/model.role");
const Bcrypt = require("../../util/util.bcrypt");
const jwt = require("../../util/util.jwt");
const { validationResult } = require("express-validator");

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

                // TÌM ROLE CLIENT CHO ACCOUNT ĐƯỢC TẠO TỪ CLIENT
                let roleInfor = await ModelRole.findOne({name: {$eq: 'Client'}});
                let passwordBcrypt = Bcrypt.has(password);

                // TẠO ACCOUNT CLIENT
                let userInfor = await ModelUser.create({
                    fullname: fullName, email,
                    password: passwordBcrypt,
                    role: roleInfor,
                    phonenumber: phone, address
                })

                if(userInfor) {
                    // LƯU LIÊN GIỮA ROLE VÀ ACCOUNT
                    roleInfor.users.push(userInfor);
                    await roleInfor.save();

                    // TẠO TOKEN SAU KHI CLIENT TẠO ACCOUNT THÀNH CÔNG
                    jwt.sign({email: userInfor.email}, (infor) => {
                        if(infor.status) {
                            res.status(200).json({
                                status: true,
                                message: 'Register account successfully',
                                infor: {
                                    token: infor.token,
                                    username: userInfor.username? userInfor.username : '',
                                    fullname: userInfor.fullname? userInfor.fullname : '',
                                    email: userInfor.email,
                                    phone: userInfor.phonenumber? userInfor.phonenumber : '',
                                    role: userInfor.role.name
                                }
                            })

                        } else {
                            res.status(406).json({status: true, message: 'Accept toke failed'});
                        }
                    })

                } else {
                    res.status(406).json({status: true, message: 'Register account failed'});
                }
            }
        } catch (error) {
            res.status(500).json({status: false, message: 'Internal server failed'});

        }
    }
    
}

module.exports = new ControllerUser();