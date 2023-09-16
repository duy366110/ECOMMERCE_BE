"use strict"
const ModelUser = require("../../model/model.user");
class ControllerCart {

    constructor() { }

    // KHÁCH HÀNG LẤY DANH SÁCH SẢN PHẨM TRONG CART HIỆN TẠI
    getCartOfUser = async function(req, res, next) {
        try {
            let { user } = req;
            let userInfor = await ModelUser.findById(user._id).select('email, cart').populate(['cart.product']).lean();
            res.status(200).json({status: true, message: 'User information cart', user: userInfor});

        } catch (error) {
            // PHƯƠNG THỨC LỖI
            res.status(500).json({status: false, message: 'Internal server failed'});
        }
    }


    // KHÁCH HÀNG THÊM SẢN PHẨM VÀO CART
    cartAddProduct = async function (req, res, next) {
        try {
            let { product, user } = req;
            let { quantity } = req.body;

            if(product.quantity) {
                // SETUP THÔNG TIN SẢN PHẨM TRƯỚC KHI LƯU
                let infor = { product,  quantity};
                if(user.cart.length) {

                let cart = user.cart.find((cart) => cart.product._id.toString() === product._id.toString());
                    if(cart) {
                        // SẢN PHẨM ĐÃ TỒN TẠI VÀ TĂNG THÊM SỐ LƯỢNG SẢN PHẨM
                        user.cart = user.cart.map((cartElm) => {
                            if(cartElm.product._id.toString() === product._id.toString()) {
                                cartElm.quantity = cartElm.quantity + quantity;
                            }

                            return cartElm;
                        })

                    } else {
                        // SẢN PHẨM CHƯA CÓ THÊM MỚI
                        user.cart.push(infor);

                        // SỐ LƯỢNG THAM CHIẾU CỦA SẢN PHẨM TRONG MỖI HOÁ ĐƠN
                        product.ref += 1;
                    }

                } else {
                    // SẢN PHẨM CHƯA CÓ THÊM MỚI
                    user.cart.push(infor);

                    // SỐ LƯỢNG THAM CHIẾU CỦA SẢN PHẨM TRONG MỖI HOÁ ĐƠN
                    product.ref += 1;
                }

                // LƯU SẢN PHẨM VÀO CART
                await user.save();

                // GIẢM SỐ LƯỢNG SẢN PHẨM TRONG KHO
                product.quantity -= Number(quantity);
                await product.save();

                res.status(200).json({status: true, message: 'Add product to cart successfully'});

            } else {
                res.status(406).json({status: false, message: 'Out of product'});
            }


        } catch (error) {
            // PHƯƠNG THỨC LỖI
            res.status(500).json({status: false, message: 'Internal server failed'});
        }
    }

    // TĂNG QUANTITY SẢN PHẨM TRONG CART
    increaseQuantityProductOfCart = async function (req, res, next) {
        try {
            let { user, product } = req;
            
            user.cart = user.cart.map((cart) => {
                if(cart.product._id.toString() === product._id.toString()) {
                    cart.quantity++;

                    // KHÁCH HÀNG MUA THÊM SẢN PHẨM GIẢM SỐ LƯỢNG SẢN PHẨM TRONG KHO
                    product.quantity--;
                }
                return cart;
            })

            //LƯU THAY ĐỔI
            await user.save();
            await product.save();

            res.status(200).json({status: true, message: 'Increase product in cart successfully'});

        } catch (error) {
            // PHƯƠNG THỨC LỖI
            res.status(500).json({status: false, message: 'Internal server failed'});
        }
    }

    // GIẢM QUANTITY SẢN PHẨM TRONG CART
    decreaseQuantityProductOfCart = async function (req, res, next) {
        try {
            let { user, product } = req;
            // let { product } = req.body;

            user.cart = user.cart.map((cart) => {
                if(cart.product._id.toString() === product._id.toString()) {
                    cart.quantity--;

                    // TĂNG SỐ LƯỢNG SẢN PHẨM TRONG KHO CỦA SẢN PHẨM
                    product.quantity++;

                    // SỐ LƯỢNG SẢN PHẨM TRONG USER CART LÀ 0, THỰC HIỆN XOÁ THAM CHIẾU TỪ USER ĐẾN PRODUCT
                    if(!cart.quantity) {
                        product.ref--;
                    }

                }
                return cart;
            }).filter((cart) => cart.quantity)

            // LƯU THAY ĐỔI
            await user.save();
            await product.save();

            res.status(200).json({status: true, message: 'Increase product in cart successfully'});

        } catch (error) {
            // PHƯƠNG THỨC LỖI
            res.status(500).json({status: false, message: 'Internal server failed'});
        }
    }

    // KHÁCH HÀNG THỰC HIỆN LOẠI BỎ SẢN PHẨM TRONG CART
    cartRemoveProduct = async function(req, res, next) {
        try {

            let { user, product } = req;

            user.cart = user.cart.map((cartItem) => {

                if(cartItem.product._id.toString() === product._id.toString()) {
                    // TRẢ LẠI SỐ SẢN PHẨM KHÁCH HÀNG ĐÃ ORDER VỀ KHO
                    product.quantity += Number(cartItem.quantity);

                    // HUỶ THAM CHIẾU TỪ CART USER ĐẾN PRODUCT
                    product.ref -= 1;
                    return null;
                }

                return cartItem;
            }).filter((cartItem) => cartItem)

            // LƯU THAY ĐỔI
            await user.save();
            await product.save();

            res.status(200).json({status: true, message: 'Remove product to cart successfully'});

        } catch (error) {
            // PHƯƠNG THỨC LỖI
            res.status(500).json({status: false, message: 'Internal server failed'});

        }
    }
}

module.exports = new ControllerCart();