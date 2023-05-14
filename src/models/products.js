const dbPool = require("../config/database");

const getAllProduct = () => {
  const SQLQuery = `SELECT * FROM products`;

  return dbPool.execute(SQLQuery);
};

const getAllProductByCategory = (id_category) => {
  const SQLQuery = `SELECT * FROM products WHERE id_category = "${id_category}"`;

  return dbPool.execute(SQLQuery);
};

const createNewProduct = (body) => {
  const SQLQuery = `INSERT INTO products (id_category, code_product, stock, product_name, image, satuan, harga)
                        VALUES(${body.id_category}, "${body.code_product}", ${body.stock}, "${body.product_name}", "${body.image}", ${body.satuan}, ${body.harga})`;

  return dbPool.execute(SQLQuery);
};

module.exports = {
  getAllProduct,
  createNewProduct,
  getAllProductByCategory,
};
