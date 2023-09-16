"use strict"
const router = require("express").Router();
const RouterUser = require("./router.user");
const RouterCategory = require("./router.category");
const RouterProduct =  require("./router.product");
const RouterCart = require('./router.cart');
const RouterOrder = require('./router.order');
const RouterTransaction = require("./router.transaction");

router.use("/user", RouterUser);
router.use("/category", RouterCategory);
router.use("/product", RouterProduct);
router.use('/cart', RouterCart);
router.use("/order", RouterOrder);
router.use("/transaction", RouterTransaction);

module.exports = router;