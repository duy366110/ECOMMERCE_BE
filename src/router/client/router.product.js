"use strict"
const router = require("express").Router();
const ControllerProduct = require("../../controller/client/controller.product");

// TRUY XUẤT SỐ LƯỢNG SẢN PHẨM
router.get("/amount", ControllerProduct.getAmount);

// TRUY XUẤT DANH SÁCH SẢN PHẨM
router.get("/:limit/:start", ControllerProduct.getProducts);

// ROUTER TÌM PRODUCT THEO ID
router.get("/:product", ControllerProduct.getProductById);

module.exports = router;