"use strict"
const router = require("express").Router();
const MiddlewareUser = require("../../middleware/client/middleware.user");
const ControllerUser = require("../../controller/client/controller.transaction");

// KHÁCH HÀNG TRUY CẬP DANH SÁCH GIAO DỊCH
router.get("/", MiddlewareUser.findUserByToken, ControllerUser.getTransaction);

module.exports = router;