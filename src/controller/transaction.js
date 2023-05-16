const TransactionModel = require("../models/transaction");

const createNewTransaction = async (req, res) => {
  const { body } = req;

  try {
    const result = await TransactionModel.createNewTransaction(body);
    res.status(200).json({
      message: "Create Transaction Success",
      result,
    });
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
