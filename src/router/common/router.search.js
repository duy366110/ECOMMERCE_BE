"use strict"
const router = require('express').Router();
const ControllerSearch = require("../../controller/common/controller.search");

// GET PRODUCT AMOUNT BY TYPE CATEGORY
router.get("/product/amount", ControllerSearch.searchAmountProductByCategory);

// GET PRODUCT BY CONDITION TYPE CATEGORY AND LIMT
router.get("/:type/:limit/:start", ControllerSearch.searchProductByTypeCategory);

// TRUY XUẤT DANH MỤC SẢN PHẨM THEO GIÁ TRỊ NGƯỜI DÙNG NHẬP VÀO
router.post("/custom", ControllerSearch.searchProductByValueInput);



module.exports = router;