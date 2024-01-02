"use strict"
const router = require("express").Router();
const ControllerFeatured = require("../../controller/client/controller.featured");

// TRUY XUẤT DANH MỤC FEATURED
router.get("/", ControllerFeatured.getAllFeatured);

module.exports = router;