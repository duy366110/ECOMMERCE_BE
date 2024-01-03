"use strict"
const router = require('express').Router();
const ControllerSearch = require("../../controller/common/controller.search");

// TRUY XUẤT DANH SÁCH SẢN PHẨM THEO TYPE
router.get("/:type/:limit/:start", ControllerSearch.searchProductByType);
router.get("/:category", ControllerSearch.searchAmountCategory);

// TRUY XUẤT DANH MỤC SẢN PHẨM THEO GIÁ TRỊ NGƯỜI DÙNG NHẬP VÀO
router.post("/custom", ControllerSearch.searchProductByValueInput);



module.exports = router;