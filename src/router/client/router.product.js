"use strict"
const router = require("express").Router();
const ControllerProduct = require("../../controller/client/controller.product");

// ROUTER LẤY VỀ SỐ LƯỢNG PRODUCT.
router.get("/amount", ControllerProduct.getAmoutnProduct);

// ROUTER TRẢ VỀ PRODUCT VỚI SỐ LƯỢNG ĐƯỢC CHỈ ĐỊNH
router.get("/:limit/:start", ControllerProduct.getLimitProducts);

// ROUTER TÌM PRODUCT THEO ID
router.get("/:product", ControllerProduct.getProductById);

module.exports = router;