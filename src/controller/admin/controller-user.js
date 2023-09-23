const mongodb = require('mongodb');
const { validationResult } = require('express-validator');
const ModelRole = require('../../model/model.role');
const ModelUser = require("../../model/model.user");

const ServiceUser = require("../../services/service.user");

class ControllerUser {

    constructor() { }

    // TRUY XUẤT DANH MỤC USER
    async getUsers (req, res, next) {
        try {
            let { limit, start} = req.params;
            await ServiceUser.getLimit(limit, start, (information) => {
                let { status , message, users} = information;

                if(status) {
                    res.status(200).json({status, message, users});

                } else {
                    res.status(406).json({status, message, error});
                }
            })
        } catch (error) {
            // PHƯƠNG THỨC LỖI
            res.status(500).json({status: false, message: 'Internal server failed'});

        }
    }

    // TRUY XUẤT TẤT CẢ DANH MỤC USER
    async getUsersAll (req, res, next) {
        try {
            await ServiceUser.getAll((information) => {
                let { status, message, users } = information;
                if(status) {
                    res.status(200).json({status, message, users});

                } else {
                    res.status(406).json({status, message, error});
                }
            })

        } catch (error) {
            // PHƯƠNG THỨC LỖI
            res.status(500).json({status: false, message: 'Internal server failed'});
        }
    }

    // TRUY XUẤT USER THEO ID
    async getUserById (req, res, next) {
        try {
            let { user } = req.params;
            await ServiceUser.getById(user, (information) => {
                let { status, message, user, error } = information;
                if(status) {
                    res.status(200).json({status, message, user});

                } else {
                    res.status(406).json({status, message, error});
                }
            })

        } catch (error) {
            // PHƯƠNG THỨC LỖI
            res.status(500).json({status: false, message: 'Internal server failed'});

        }
    }

    // TRUY XUẤT SỐ LƯỢNG USER
    async getAmount (req, res, next) {
        try {
            await ServiceUser.getAmount((information) => {
                let { status , message, amount} = information;

                if(status) {
                    res.status(200).json({status, message, amount});

                } else {
                    res.status(406).json({status, message, error});
                }
            })
            
        } catch (error) {
            // PHƯƠNG THỨC LỖI
            res.status(500).json({status: false, message: 'Internal server failed'});
        }
    }

    // CREATE USER
    async createUser(req, res, next) {
        const { errors } = validationResult(req);

        try {
            if(errors.length) {
                res.status(406).json({status: false, message: 'E-mail account exists already'});
                
            } else {
                let {username, fullname, email, password, role, phonenumber, address} = req.body;

                // THỰC HIÊNK TÌM KIẾM ROLE CỦA USER
                let roleInfor = await ModelRole.findById(role);
                await ServiceUser.create({username, fullname, email, password, phonenumber, address}, roleInfor, (information) => {
                    let { status, message, error} = information;
                    if(status) {
                        res.status(200).json({status, message});

                    } else {
                        res.status(406).json({status, message, error});
                    }
                })
            }

        } catch (error) {
            res.status(500).json({status: false, message: 'Internal server failed'});

        }
    }

    // UPDATE USER
    async modifiUser(req, res, next) {
        let { errors } = validationResult(req);

        if(errors.length) {
            res.status(406).json({status: false, message: errors[0].msg});

        } else {
            try {
                let { user, username, fullname, email, phonenumber, address, role } = req.body;

                let userInfor = await ModelUser.findById(user).populate(['role']).exec();
                let roleInfor = await ModelRole.findById(role).exec();

                await ServiceUser.update({model: userInfor, username, fullname, email, phonenumber, address}, roleInfor, (information) => {
                    let { status, message, error} = information;
                    if(status) {
                        res.status(200).json({status, message});

                    } else {
                        res.status(406).json({status, message, error});
                    }
                })

            } catch (error) {
                // PHUONG THỨC LỖI
                res.status(500).json({status: false, message: 'Internal server failed'});

            }
        }
    }

    // DELETE USER
    async deleteUser(req, res, next) {
        let { errors } = validationResult(req);                                                                                               

        if(errors.length) {
            res.status(406).json({staus: false, message: errors[0].msg});

        } else {
            try {
                let { user } = req.body;
                let userInfor = await ModelUser.findById(user).populate('role').exec();
                
                await ServiceUser.delete({model: userInfor}, (information) => {
                    let { status, message, error } = information;
                    if(status) {
                        res.status(200).json({status, message});

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
}

module.exports = new ControllerUser();