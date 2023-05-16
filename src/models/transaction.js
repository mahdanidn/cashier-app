const dbPool = require("../config/database");

const createNewTransaction = (body) => {
  const { transaction, transaction_detail } = body;
  /**
   * 1. Periksa ketersediaan stock
   */
  // console.log(body);

  return dbPool
    .getConnection()
    .then((connection) => {
      return connection
        .beginTransaction()
        .then(() => {
          const promises = transaction_detail.map(async (value, index) => {
            let stok = `SELECT * FROM products WHERE id = ${value.id_product}`;
            const [results] = await connection.execute(stok);
            if (results.length === 0) {
              throw new Error(
                `Product with id ${value.id_product} does not exist`
              );
            }
            const { stock } = results[0];
            let sisaStock = stock - value.quantity;
            if (sisaStock < 0) {
              throw new Error(
                `Insufficient stock for product with id ${value.id_product}`
              );
            }
            let updateQuery = `UPDATE products SET stock = ${sisaStock} WHERE id = ${value.id_product}`;
            return await connection.execute(updateQuery);
          });
          return Promise.all(promises)
            .then(() => {
              return connection.commit();
            })
            .catch((error) => {
              connection.rollback();
              throw error;
            });
        })
        .finally(() => {
          connection.release();
        });
    })
    .then(() => {
      // Transaction successful
      // INSERT INTO transaction_detail
    })
    .catch((error) => {
      console.error(error);
      // Handle error or rollback specific to your application's needs
    });

  // let SQLTransactionDetail = `INSERT INTO transaksi_detail (invoice_id, id_product, harga, quantity, total_harga) VALUES `;
  // let values = [];

  // body.forEach((transaction, index) => {
  //   values.push(
  //     `("${transaction.invoice_id}", ${transaction.id_product}, ${transaction.harga}, ${transaction.quantity}, ${transaction.total_harga})`
  //   );
  // });

  // SQLTransactionDetail += values.join(", ");

  // const SQLTransactionDetail = `INSERT INTO transaksi_detail (invoice_id, id_product, harga, quantity, total_harga)
  // VALUES (1, 3, 12000, 4, 48000),
  // 	(1, 1, 12000, 3, 36000);`;

  // const SQLTransaction = `INSERT INTO transaksi (invoice_id, total_harga, total_seluruh)
  //   VALUES("INV17022023", 100000, 111000)
  // `;

  // return dbPool.execute(SQLTransactionDetail);
};

module.exports = {
  createNewTransaction,
};

/**
 * 
 * const createNewTransaction = (body) => {
  const insertTransaksiQuery = `INSERT INTO transaksi_detail (invoice_id, id_product, harga, quantity, total_harga)
    VALUES (1, 3, 12000, 4, 48000),
          (1, 1, 12000, 3, 36000);`;

  const insertProductQuery = `INSERT INTO products (id_category, code_product, stock, product_name, image, satuan, harga)
    VALUES(${body.id_category}, "${body.code_product}", ${body.stock}, "${body.product_name}", "${body.image}", ${body.satuan}, ${body.harga})`;

  return dbPool.getConnection()
    .then(connection => {
      return connection.beginTransaction()
        .then(() => {
          return connection.query(insertTransaksiQuery)
        })
        .then(() => {
          return connection.query(insertProductQuery)
        })
        .then(() => {
          return connection.commit()
        })
        .catch(error => {
          connection.rollback()
          throw error
        })
        .finally(() => {
          connection.release()
        })
    })
};

 * 
 */

/**
 * 
 * {
  "transaction": {
    "invoice_id": "INV",
    "total_harga": 100000,
    "total_seluruh": 111000
  },
  "transaction_detail":[
  {
    "invoice_id": "INV17022023",
    "id_product": "2",
    "harga": 8000,
    "quantity": 5,
    "total_harga": 40000
  },
  {
    "invoice_id": "INV17022023",
    "id_product": "1",
    "harga": 12000,
    "quantity": 2,
    "total_harga": 24000
  },
  {
    "invoice_id": "INV17022023",
    "id_product": "3",
    "harga": 12000,
    "quantity": 3,
    "total_harga": 36000
  }
]
  
}
 */
