const dbPool = require("../config/database");

const createNewTransaction = () => {
  const SQLQuery = `INSERT INTO transaksi_detail (invoice_id, id_product, harga, quantity, total_harga)
	VALUES (1, 3, 12000, 4, 48000),
		(1, 1, 12000, 3, 36000);`;

  return dbPool.execute(SQLQuery);
};

module.exports = {
  createNewTransaction,
};
