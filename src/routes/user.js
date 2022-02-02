const express = require("express");

const userController = require("../controllers/user");

const router = express.Router();
const {
  login,
  createUser,
} = userController;

// Auth routes
router.post("/register", createUser);
router.post("/login", login);

module.exports = router;