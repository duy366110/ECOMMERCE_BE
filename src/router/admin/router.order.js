"use strict"
const router = require("express").Router();
const ControllerOrder = require("../../controller/admin/controller.order");


// TRUY XUẤT SỐ LƯỢNG ORDER
router.get("/amount", ControllerOrder.getAmount);
router.get("/information", ControllerOrder.getInformation);

// TRUY XUẤT DANH MỤC ORDER
router.get("/:limit/:start", ControllerOrder.getOrders);

module.exports = router;