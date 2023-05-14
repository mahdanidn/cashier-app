const CategoryModel = require("../models/categories");

const getAllCategories = async (req, res) => {
  try {
    const [data] = await CategoryModel.getAllCategories();

    res.status(200).json({
      message: "Get All categories success",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

module.exports = {
  getAllCategories,
};
