const dbPool = require("../config/database");

const getAllCategories = () => {
  const SQLQuery = "SELECT * FROM categories";

  return dbPool.execute(SQLQuery);
};

module.exports = {
  getAllCategories,
};
