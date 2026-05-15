const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");
const authMiddleware = require("../middleware/auth");

router.get("/", authMiddleware, cartController.getCart);
router.post("/add", authMiddleware, cartController.addItemToCart);
router.delete("/clear", authMiddleware, cartController.clearCart);

module.exports = router;
