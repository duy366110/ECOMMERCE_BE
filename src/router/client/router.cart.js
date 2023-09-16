"use strict"
const router = require("express").Router();
const MiddlewareUser = require("../../middleware/client/middleware.user");
const MiddlewareProduct = require("../../middleware/client/middleware.product");
const ControllerCart = require("../../controller/client/controller.cart");

// ROUTER LẤY DANH SÁCH CART TỪ USER
router.get("/", MiddlewareUser.findUserByToken, ControllerCart.getCartOfUser);

// ROUTER CLIENT THÊM SẢN PHẨM VÀO CART
router.post('/', MiddlewareUser.findUserByToken, MiddlewareProduct.findProductById, ControllerCart.cartAddProduct);

// ROUTER CLIENT GIẢM SỐ LƯỢNG SẢN PHẨM ITEM CỦA CART
router.patch('/increase', MiddlewareUser.findUserByToken, MiddlewareProduct.findProductById, ControllerCart.increaseQuantityProductOfCart);

// ROUTER CLIENT GIẢM SỐ LƯỢNG SẢN PHẨM ITEM CỦA CART
router.patch("/decrease", MiddlewareUser.findUserByToken, MiddlewareProduct.findProductById, ControllerCart.decreaseQuantityProductOfCart);

// ROUTER CLIENT XOÁ SẢN PHẨM RONG CART
router.delete("/product", MiddlewareUser.findUserByToken, MiddlewareProduct.findProductById, ControllerCart.cartRemoveProduct);

module.exports = router;