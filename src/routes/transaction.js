const express = require("express");

const TransactionController = require("../controller/transaction");

const routerTransaction = express.Router();

// CREATE TRANSACTION PRODUCT
routerTransaction.post("/", TransactionController.createNewTransaction);

// GET DATA PRODUCTS
// routerTransaction.get("/", ProductController.getAllProducts);

// // GET DATA PRODUCTS BY ID CATEGORY
// routerTransaction.get("/:id_category", ProductController.getAllProductByCategory);

module.exports = routerTransaction;
