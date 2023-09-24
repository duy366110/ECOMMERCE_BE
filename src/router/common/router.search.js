"use strict"
const router = require('express').Router();
const ControllerSearch = require("../../controller/common/controller.search");

// TRUY XUẤT DANH SÁCH SẢN PHẨM THEO TYPE
router.get("/type/:type", ControllerSearch.searchProductByType);



module.exports = router;