"use strict"
const router = require("express").Router();
const ControllerOrder = require("../../controller/admin/controller.order");


// ROUTER LẤY VỀ SỐ LƯỢNG ORDER.
router.get("/amount", ControllerOrder.getAmoutnOrder);

// ROUTER TRẢ VỀ ORDER VỚI SỐ LƯỢNG ĐƯỢC CHỈ ĐỊNH
router.get("/:limit/:start", ControllerOrder.getLimitOrders);

module.exports = router;