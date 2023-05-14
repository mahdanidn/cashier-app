const ProductModel = require("../models/products");

const getAllProducts = async (req, res) => {
  try {
    const [data] = await ProductModel.getAllProduct();

    res.status(200).json({
      message: "Get All products success",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const getAllProductByCategory = async (req, res) => {
  try {
    const { id_category } = req.params;

    const [data] = await ProductModel.getAllProductByCategory(id_category);

    res.status(201).json({
      message: "Get All products by category",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const createNewProduct = async (req, res) => {
  const { body } = req;

  try {
    await ProductModel.createNewProduct(body);
    res.status(201).json({
      message: "CREATE new product success",
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const updateUser = async (req, res) => {
  const { idUser } = req.params;
  const { body } = req;
  try {
    await ProductModel.updateUser(idUser, body);
    res.status(200).json({
      message: "UPDATE user success",
      data: {
        id: idUser,
        ...body,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      serverMessage: error,
    });
  }
};

const deleteUser = async (req, res) => {
  const { idUser } = req.params;

  try {
    await ProductModel.deleteUser(idUser);
    res.status(200).json({
      message: "DELETE user success",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      serverMessage: error,
    });
  }
};

module.exports = {
  getAllProducts,
  createNewProduct,
  getAllProductByCategory,
  // updateUser,
  // deleteUser,
};
