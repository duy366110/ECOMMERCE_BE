"use strict"
const ModelRole = require("../../model/model.role");
const { validationResult } = require('express-validator');
const ServiceRole = require("../../services/service.role");

class ControllerRole {

    constructor() { }

    // ADMIN LẤY TẤT CẢ CÁC ROLE HIỆN CÓ
    async getRoles(req, res, next) {
        try {
            let { limit, start} = req.params;
            await ServiceRole.getLimit(limit, start, (information) => {
                let { status , message, roles} = information;

                if(status) {
                    res.status(200).json({status, message, roles});

                } else {
                    res.status(406).json({status, message, error});
                }
            })
        } catch (error) {
            // PHƯƠNG THỨC LỖI
            res.status(500).json({status: false, message: 'Internal server failed'});

        }
    }

    // TRUY XUẤT DANH MỤC ROLE
    async getRolesAll(req, res, next) {
        try {
            await ServiceRole.getAll((information) => {
                let { status, message, roles } = information;
                if(status) {
                    res.status(200).json({status, message, roles});

                } else {
                    res.status(406).json({status, message, error});
                }
            })

        } catch (error) {
            // PHƯƠNG THỨC LỖI
            res.status(500).json({status: false, message: 'Internal server failed'});
        }
    }

    // TRUY XUẤT ROLE THEO ID
    async getRoleById(req, res, next) {
        try {
            let { role } = req.params;
            await ServiceRole.getById(role, (information) => {
                let { status, message, role, error } = information;
                if(status) {
                    res.status(200).json({status, message, role});

                } else {
                    res.status(406).json({status, message, error});
                }
            })

        } catch (error) {
            // PHƯƠNG THỨC LỖI
            res.status(500).json({status: false, message: 'Internal server failed'});

        }
    }

    // TRUY XUẤT SỐ LƯỢNG ROLE HIỆN CÓ
    async getAmount(req, res, next) {
        try {
            await ServiceRole.getAmount((information) => {
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

    // CREATE ROLE
    async createRole(req, res, next) {
        const { errors } = validationResult(req);

        // XÁC THỰC LỖI THÔNG BÁO VỀ ADMIN
        if(errors.length) {
            res.status(400).json({staus: false, message: errors[0].msg});

        } else {
            try {
                const { role } = req.body;
                await ServiceRole.create({name: role}, (information) => {
                    let { status, message, error} = information;

                    if(status) {
                        res.status(200).json({status, message});

                    } else {
                        res.status(406).json({status, message, error});
                    }
                })

            } catch (err) {
                // PHƯƠNG THỨC LỖI
                res.status(500).json({status: false, message: 'Internal server failed'});
            }
        }
    }

    // UPDATE ROLE
    async modifiRole(req, res, next) {
        let { errors } = validationResult(req);

        try {

            if(errors.length) {
                res.status(400).json({staus: false, message: errors[0].msg});

            } else {
                let { role, name } = req.body;
                let roleInfor = await ModelRole.findById(role);

                await ServiceRole.update({model: roleInfor, name}, (information) => {
                    let { status, message , error } = information;
                    if(status) {
                        res.status(200).json({status, message});

                    } else {
                        res.status(406).json({status, message, error});
                    }
                })
            }

        } catch (error) {
            // PHƯƠNG THỨC LỖI
            res.status(500).json({status: false, message: 'Internal server failed'});

        }
    }

    // DELETE ROLE
    async deleteRole(req, res, next) {
        let { errors } = validationResult(req);

        if(errors.length) {
            res.status(400).json({staus: false, message: errors[0].msg});

        } else {
            try {
                let { role } = req.body;
                let roleInfor = await ModelRole.findById(role);

                await ServiceRole.delete({model: roleInfor}, (information) => {
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

module.exports = new ControllerRole();