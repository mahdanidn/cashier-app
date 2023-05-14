const TransactionModel = require("../models/transaction");

const createNewTransaction = async (req, res) => {
  try {
    // const [data] = await TransactionModel.getAllCategories();
    // res.status(200).json({
    //   message: "Get All categories success",
    //   data,
    // });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

module.exports = {
  createNewTransaction,
};
