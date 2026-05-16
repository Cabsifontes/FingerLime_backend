const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");
const { userAuth } = require("../middleware/auth");

router.get("/", userAuth, cartController.getCart);
router.post("/add", userAuth, cartController.addItemToCart);
router.delete("/clear", userAuth, cartController.clearCart);

module.exports = router;
