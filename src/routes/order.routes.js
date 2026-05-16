const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");
const { userAuth } = require("../middleware/auth");

router.post("/", userAuth, orderController.createOrder);
router.get("/user", userAuth, orderController.getUserOrders);

module.exports = router;
