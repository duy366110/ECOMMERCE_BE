"use strict"
const { validationResult } = require("express-validator");
const ServiceFeatured = require("../../services/service.featured");

class ControllerFeatured {

    constructor() { }

    // TRUY XUẤT DANH MỤC FEATUREDS
    async getFeatureds(req, res, next) {
        try {
            let { limit, start} = req.params;
            await ServiceFeatured.getLimit(limit, start, (information) => {
                let { status , message, featureds} = information;

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

    // TRUY XUẤT TẤT CẢ DANH MỤC CATEGORY
    async getCategoriesAll (req, res, next) {
        // try {
        //     await ServiceCategory.getAll((information) => {
        //         let { status, message, categories } = information;
        //         if(status) {
        //             res.status(200).json({status, message, categories});

        //         } else {
        //             res.status(406).json({status, message, error});
        //         }
        //     })

        // } catch (error) {
        //     // PHƯƠNG THỨC LỖI
        //     res.status(500).json({status: false, message: 'Internal server failed'});
        // }
    }

    // TRUY XUẤT CATEGORY THEO ID
    getCategoryById = async (req, res, next) => {
        // try {
        //     let { category } = req.params;
        //     await ServiceCategory.getById(category, (information) => {
        //         let { status, message, category, error } = information;
        //         if(status) {
        //             res.status(200).json({status, message, category});

        //         } else {
        //             res.status(406).json({status, message, error});
        //         }
        //     })

        // } catch (error) {
        //     // PHƯƠNG THỨC LỖI
        //     res.status(500).json({status: false, message: 'Internal server failed'});

        // }
    }

    // TRUY XUẤT SỐ LƯỢNG FEATURED
    async getAmount(req, res, next) {
        try {
            await ServiceFeatured.getAmount((information) => {
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

    // ADMIN THÊM MỚI FEATURED
    createFeatured = async(req, res, next) => {
        let { errors } = validationResult(req);

        if(errors.length) {
            res.status(406).json({status: false, message: errors[0].msg});

        } else {
            try {
                let { files } =  req;
                let { title, des, color } = req.body;

                // LẤY THÔNG TIN DANH SÁCH HÌNH ẢNH FEATURED
                let images = [];
                if(files.length) {
                    images = files.map((image) => {
                        return image.path? image.path : '';
                    })
                }

                // TẠO MỚI THÔNG TIN FEATURED
                await ServiceFeatured.createFeatured({title, des, color}, images, (information) => {
                    let { status, message, error } = information;
                    if(status) {
                        res.status(200).json({status: true, message});

                    } else {
                        res.status(406).json({status: false, message, error});
                    }
                })

            } catch (err) {
                // PHƯƠNG THỨC LỖI
                res.status(500).json({status: false, message: 'Internal server failed'});
            }
        }
    }

    // ADMIN TIẾN HÀNH CẬP NHẬT
    modifiCategory = async(req, res, next) => {
        // let { errors } = validationResult(req);

        // if(errors.length) {
        //     res.status(406).json({status: false, message: errors[0].msg});

        // } else {
        //     try {
        //         let { category, title } = req.body;
        //         let { files } =  req;

        //         let categoryInfor = await ModelCategory.findById(category);

        //         // LẤY THÔNG TIN DANH SÁCH HÌNH ẢNH CATEGORY
        //         let images = [];
        //         if(files.length) {
        //             images = files.map((image) => {
        //                 return image.path? image.path : '';
        //             })
        //         }

        //         // TẠO MỚI THÔNG TIN CATEGORY
        //         await ServiceCategory.update({model: categoryInfor, title}, images, (information) => {
        //             let { status, message, error } = information;
        //             if(status) {
        //                 res.status(200).json({status: true, message});

        //             } else {
        //                 res.status(406).json({status: false, message, error});
        //             }
        //         })

        //     } catch (error) {
        //         // PHƯƠNG THỨC LỖI
        //         res.status(500).json({status: false, message: 'Internal server failed'});
        //     }
        // }
    }

    // ADMIN DELETE FEATURE
    deleteFeature = async (req, res, next) => {
        let { errors } = validationResult(req);

        if(errors.length) {
            res.status(406).json({status: false, message: errors[0].msg});

        } else {
            try {
                let { feature } = req.body;
                
                // THỰC HIỆN XOÁ FEATURE THÔNG QUA ID
                let featureInfor = await ServiceFeatured.findFeatureById(feature);

                await ServiceFeatured.delete({model: featureInfor}, (information) => {
                    let { status, message, error } = information;
                    if(status) {
                        res.status(200).json({status: true, message});

                    } else {
                        res.status(406).json({status: false, message, error});
                    }
                });

            } catch (error) {
                // PHƯƠNG THỨC LỖI
                res.status(500).json({status: false, message: 'Internal server failed'});
            }
        }
    }

    // ADMIN XOÁ ẢNH CATEGORY
    deletePhoto = async (req, res, next) => {
        // let { errors } = validationResult(req);

        // if(errors.length) {
        //     res.status(406).json({status: false, message: errors[0].msg});

        // } else {
        //     try {
        //         let { id, photo } = req.body;
        //         let categoryInfor = await ModelCategory.findById(id);

        //         await ServiceCategory.deleteImage({model: categoryInfor}, photo, (information) => {
        //             let { status, message, error } = information;
        //             if(status) {
        //                 res.status(200).json({status: true, message});

        //             } else {
        //                 res.status(406).json({status: false, message, error});
        //             }
        //         })
    
    
        //     } catch (error) {
        //         // PHƯƠNG THỨC LỖI
        //         res.status(500).json({status: false, message: 'Internal server failed'});
        //     }
        // }
    }

}

module.exports = new ControllerFeatured();