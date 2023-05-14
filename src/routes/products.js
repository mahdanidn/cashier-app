const express = require("express");

const ProductController = require("../controller/products");

const routerProduct = express.Router();

// CREATE DATA PRODUCT
routerProduct.post("/", ProductController.createNewProduct);

// GET DATA PRODUCTS
routerProduct.get("/", ProductController.getAllProducts);

// GET DATA PRODUCTS BY ID CATEGORY
routerProduct.get("/:id_category", ProductController.getAllProductByCategory);

// // UPDATE - PATCH
// router.patch("/:idUser", ProductController.updateUser);

// // DELETE
// router.delete("/:idUser", ProductController.deleteUser);

module.exports = routerProduct;
