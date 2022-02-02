const express = require("express");

const cartController = require("../controllers/cart");
const {addToCartValidator}  = require("../validators/cart");
const authMiddleware = require("../middleware/authMiddleware");



const router = express.Router();

const {
  addToCart,
  retrieveCart,
  removeFromCart,
  modifyCart
} = cartController;


// Cart routes
router.post("/cart", authMiddleware, addToCart)
router.delete("/cart/:cartId",authMiddleware, removeFromCart)
router.get("/cart/:cartId",retrieveCart)
router.patch("/cart/:cartId",authMiddleware,modifyCart)

module.exports = router;