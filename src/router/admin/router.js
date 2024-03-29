const router = require('express').Router();
const RouterRole = require("./router.role");
const RouterUser = require("./router.user");
const RouterCategory = require("./router.category");
const RouterFeatured = require("./router.featured");
const RouterProduct = require("./router.product");
const RouterOrder = require("./router.order");


router.use("/role", RouterRole);
router.use("/user", RouterUser);
router.use("/category", RouterCategory);
router.use("/featured", RouterFeatured);
router.use('/product', RouterProduct);
router.use("/order", RouterOrder);

module.exports = router;