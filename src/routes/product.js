const express = require("express");

const productController = require("../controllers/product");
const authMiddleware = require("../middleware/authMiddleware");


const router = express.Router();

const {
  getAllProducts,
  createProduct,
  getAProduct,
  deleteProduct,
  updateProduct,
  getProductsByCategory
} = productController;


// Product routes
router.get("/products",getAllProducts);
router.get("/products/:productId", getAProduct)
router.post("/products", authMiddleware, createProduct)
router.delete("/products/:productId",authMiddleware, deleteProduct)
router.patch("/products/:productId", authMiddleware, updateProduct);
router.get("/category/:categoryId/products",getProductsByCategory);

module.exports = router;