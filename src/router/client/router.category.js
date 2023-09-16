const router = require('express').Router();
const ControllerCategory = require("../../controller/client/controller-category");

// ROUTER LẤY DANH SÁCH LOCATION CHO CLIENT
router.get("/", ControllerCategory.getCategory);

// ROUTER TÌM CATEGORY THEO ID
router.get("/:category", ControllerCategory.getCategoryById);

module.exports = router;