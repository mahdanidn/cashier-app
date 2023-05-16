require("dotenv").config();
const PORT = process.env.PORT || 5000;
const express = require("express");
const categoriesRoute = require("./routes/categories");
const productsRoute = require("./routes/products");
const transactionRoute = require("./routes/transaction");
const middlewareLogRequest = require("./middleware/log");

const app = express();

app.use(middlewareLogRequest);
app.use(express.json());

app.use("/categories", categoriesRoute);

app.use("/products", productsRoute);

app.use("/transaction", transactionRoute);

app.listen(PORT, () => {
  console.log(`running server ${PORT} successfuly`);
});
