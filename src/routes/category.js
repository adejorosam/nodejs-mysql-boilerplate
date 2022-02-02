const express = require("express");

const categoryController = require("../controllers/category");
const authMiddleware = require("../middleware/authMiddleware");
const {createValidator} = require("../validators/category")

const router = express.Router();
const {
  getAllCategories,
  createCategory,
  getACategory,
  deleteCategory,
  updateCategory
} = categoryController;


// Category routes
router.get("/categories",getAllCategories);
router.get("/categories/:categoryId", getACategory)
// router.route()
router.post("/categories", authMiddleware, createCategory)
router.delete("/categories/:categoryId",authMiddleware, deleteCategory)
router.patch("/categories/:categoryId", authMiddleware, updateCategory);
module.exports = router;