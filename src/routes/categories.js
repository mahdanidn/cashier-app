const express = require("express");

const CategoriesController = require("../controller/categories");

const router = express.Router();

// GET ALL CATEGORIES
router.get("/", CategoriesController.getAllCategories);

module.exports = router;
