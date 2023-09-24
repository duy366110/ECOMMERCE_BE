"use strict"
const ModelUser = require("../model/model.user");

class ServiceCart {

    constructor() { }

    // TRUY XUẤT DANH SÁCH CART CỦA USER ACCOUNT
    async getCartOfUser(user = {}, cb) {
        try {
            let cart = await ModelUser.findById(user.model._id).select('email, cart').populate(['cart.product']).lean();
            cb({status: true, message: 'Get cart of user successfully', cart});

        } catch (error) {
            // THỰC HIỆN PHƯƠNG THỨC LỖI
            cb({status: false, message: 'Method failed', error});
        }
    }

    // THÊM PRODUCT VÀO CART
    async addProduct(user = {}, product = {}, quantity = 0, cb) {
        try {

            if(product.quantity) {
                // SETUP THÔNG TIN SẢN PHẨM TRƯỚC KHI LƯU
                let infor = { product,  quantity};

                if(user.model.cart.length) {
                    let cart = user.model.cart.find((cart) => cart.product._id.toString() === product._id.toString());

                     // SẢN PHẨM ĐÃ CÓ TRONG ORDER - TĂNG SỐ LƯỢNG
                    if(cart) {
                        user.model.cart = user.model.cart.map((cartElm) => {
                            if(cartElm.product._id.toString() === product._id.toString()) {
                                cartElm.quantity += quantity;
                            }

                            return cartElm;
                        })

                    } else {
                        user.model.cart.push(infor);
                        // SỐ LƯỢNG THAM CHIẾU CỦA SẢN PHẨM TRONG MỖI HOÁ ĐƠN
                        product.ref += 1;
                    }

                } else {
                    user.model.cart.push(infor);
                    // SỐ LƯỢNG THAM CHIẾU CỦA SẢN PHẨM TRONG MỖI HOÁ ĐƠN
                    product.ref += 1;
                }

                await user.model.save();

                // GIẢM SỐ LƯỢNG SẢN PHẨM TRONG KHO
                product.quantity -= Number(quantity);
                await product.save();

                cb({status: true, message: 'Add product to cart successfully'});

            } else {
                // SẢN PHẨM ĐÃ HẾT HÀNG
                cb({status: false, message: 'Out of product'});

            }

        } catch (error) {
            // THỰC HIỆN PHƯƠNG THỨC LỖI
            cb({status: false, message: 'Method failed', error});
        }
    }

    // TĂNG SỐ LƯỢNG SẢN PHẨM TRONG CART
    async increaseQuantityProductOfCart(user = {}, product, cb) {
        try {
            user.model.cart = user.model.cart.map((cart) => {
                if(cart.product._id.toString() === product._id.toString()) {
                    cart.quantity++;

                    // GIẢM SỐ SẢN PHẨM TRONG KHO
                    product.quantity--;
                }
                return cart;
            })

            //LƯU THAY ĐỔI
            await user.model.save();
            await product.save();

            cb({status: true, message: 'Increase product in cart successfully'});

        } catch (error) {
            // THỰC HIỆN PHƯƠNG THỨC LỖI
            cb({status: false, message: 'Method failed', error});
        }
    }

    // GIẢM SỐ LƯỢNG SẢN PHẨM TRONG CART
    async decreaseQuantityProductOfCart(user = {}, product, cb) {
        try {
            user.model.cart = user.model.cart.map((cart) => {
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
            await user.model.save();
            await product.save();
            cb({status: true, message: 'Decrease product in cart successfully'});

        } catch (error) {
            // THỰC HIỆN PHƯƠNG THỨC LỖI
            cb({status: false, message: 'Method failed', error});
        }
    }

    // XOÁ SẢN PHẨM TRONG PRODUCT
    async cartRemoveProduct(user = {}, product = {}, cb) {
        try {
            user.model.cart = user.model.cart.map((cartItem) => {

                if(cartItem.product._id.toString() === product._id.toString()) {
                    // TĂNG SỐ LƯỢNG SẢN PHẨM TRONG KHO
                    product.quantity += Number(cartItem.quantity);

                    // HUỶ LIÊN KẾT SẢN PHẨM ĐẾN CART
                    product.ref -= 1;
                    return null;
                }

                return cartItem;
            }).filter((cartItem) => cartItem)

            // LƯU THAY ĐỔI
            await user.model.save();
            await product.save();
            cb({status: true, message: 'Remove product to cart successfully'});

        } catch (error) {
            // THỰC HIỆN PHƯƠNG THỨC LỖI
            cb({status: false, message: 'Method failed', error});
        }
    }
}

module.exports = new ServiceCart();


  