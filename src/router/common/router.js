const router = require('express').Router();
const RouterAuth = require("./router-auth");

router.use("/auth", RouterAuth);

module.exports = router;