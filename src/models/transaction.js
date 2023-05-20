const dbPool = require("../config/database");

class CustomError extends Error {
  constructor(message, statusCode, messageRespon) {
    super(message);
    this.messageRespon = messageRespon;
    this.statusCode = statusCode;
  }
}

const createNewTransaction = (body) => {
  const { transaction, transaction_detail } = body;
  /**
   * 1. Periksa product yang di kirimkan ada atau tidak
   * 2. Ketika product ditemukan maka kurangi stock nya lalu UPDATE query product nya
   * 3. Hitung total jumlah menu yang di pesan lalu masukkan ke dalam table transaction
   * 4. Lalu masukkan semua menu kalikan dengan jumlah quantity yang di pesan dan masukkan datanya ke dalam table transaction_detail
   */

  return dbPool
    .getConnection()
    .then((connection) => {
      return connection
        .beginTransaction()
        .then(async () => {
          const promises = [];

          for (let value of transaction_detail) {
            ``;
            let stok = `SELECT * FROM products WHERE id = ${value.id_product}`;
            const [results] = await connection.execute(stok);

            if (results.length === 0) {
              connection.rollback();
              const error = new CustomError(
                `Product with id ${value.id_product} does not exist`,
                400,
                "Terdapat menu yang tidak di temukan, harap hubungi developer"
              );
              throw error;
            }

            const { stock } = results[0];
            let sisaStock = stock - value.quantity;

            if (sisaStock <= 0) {
              connection.rollback();
              throw new Error(
                `Insufficient stock for product with id ${value.id_product}`
              );
            }

            let updateQuery = `UPDATE products SET stock = ${sisaStock} WHERE id = ${value.id_product}`;
            promises.push(connection.execute(updateQuery));
          }

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

      const SQLTransaction = `INSERT INTO transaksi (invoice_id, total_harga, total_seluruh)
        VALUES("${transaction.invoice_id}", ${transaction.total_harga}, ${transaction.total_seluruh})
      `;

      return dbPool
        .execute(SQLTransaction)
        .then(() => {
          let SQLTransactionDetail = `INSERT INTO transaksi_detail (invoice_id, id_product, harga, quantity, total_harga) VALUES `;
          let values = [];

          transaction_detail.forEach((transaction, index) => {
            values.push(
              `("${transaction.invoice_id}", ${transaction.id_product}, ${transaction.harga}, ${transaction.quantity}, ${transaction.total_harga})`
            );
          });

          SQLTransactionDetail += values.join(", ");

          return dbPool.execute(SQLTransactionDetail);
        })
        .catch((error) => {
          console.log(error.message);
          const errorCostume = new CustomError(
            error.message,
            400,
            "Gagal menambahkan data transaksi"
          );
          throw errorCostume;
        });
    })
    .catch((error) => {
      const errorMessage = {
        statusCode: 400,
        messageRespon: error.messageRespon,
        message: error.message,
      };
      return errorMessage;
    });
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
