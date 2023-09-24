"use strict"
const router = require('express').Router();
const ControllerCategory = require("../../controller/client/controller-category");

// TRUY XUẤT DANH SÁCH CATEGORY
router.get("/", ControllerCategory.getCategoryAll);

// TRUY XUẤT DANH SÁCH CATEGORY ID
router.get("/:category", ControllerCategory.getCategoryById);

module.exports = router;