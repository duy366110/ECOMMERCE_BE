"use strict"
const ModelUser = require("../../model/model.user");
const ServiceCart = require("../../services/service.cart");
class ControllerCart {

    constructor() { }

    // TRUY XUẤT DANH SÁCH CART HIỆN TẠI CỦA KHÁCH HÀNG
    async getCartOfUser(req, res, next) {
        try {
            let { user } = req;
            await ServiceCart.getCartOfUser({model: user}, (information) => {
                let { status, message, cart, error} = information;

                if(status) {
                    res.status(200).json({status, message, user: cart});

                } else {
                    res.status(406).json({status, message, error});
                }
            })

        } catch (error) {
            // PHƯƠNG THỨC LỖI
            res.status(500).json({status: false, message: 'Internal server failed'});
        }
    }


    // KHÁCH HÀNG THÊM SẢN PHẨM VÀO CART
    async cartAddProduct(req, res, next) {
        try {
            let { product, user } = req;
            let { quantity } = req.body;

            await ServiceCart.addProduct({model: user}, product, quantity, (information) => {
                let { status, message, error} = information;

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

    // TĂNG THÊM SỐ LƯỢNG SẢN PHẨM TRONG CART
    async increaseQuantityProductOfCart(req, res, next) {
        try {
            let { user, product } = req;

            await ServiceCart.increaseQuantityProductOfCart({model: user}, product, (information) => {
                let { status, message, error} = information;

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

    // GIẢM QUANTITY SẢN PHẨM TRONG CART
    async decreaseQuantityProductOfCart(req, res, next) {
        try {
            let { user, product } = req;
            await ServiceCart.decreaseQuantityProductOfCart({model: user}, product, (information) => {
                let { status, message, error} = information;

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

    // XOÁ SẢN PHẨM TRONG CART
    async cartRemoveProduct(req, res, next) {
        try {

            let { user, product } = req;
            await ServiceCart.cartRemoveProduct({model: user}, product, (information) => {
                let { status, message, error} = information;

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

module.exports = new ControllerCart();