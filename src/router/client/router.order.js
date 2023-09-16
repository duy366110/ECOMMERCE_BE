"use strict"
const router = require('express').Router();
const MiddlewareUser = require("../../middleware/client/middleware.user");
const ControllerUser = require("../../controller/client/controller.order");
const ControllerMailer = require("../../controller/common/controller.mailer");

// KHÁCH HÀNG THỰC HIỆN ORDER SẢN PHẨM
router.post("/", MiddlewareUser.findUserByToken, ControllerUser.newOrder, ControllerMailer.sendMailToClientAfterOrder, ControllerMailer.notificationAfterSendMailOrder);

module.exports = router;