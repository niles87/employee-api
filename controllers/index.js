const router = require("express").Router();

const htmlRoutes = require("./htmlRoutes");
const apiRoutes = require("./api");
const authRoutes = require("./auth");

router.use("/", htmlRoutes);
router.use("/api", apiRoutes);
router.use("/login", authRoutes);

module.exports = router;
