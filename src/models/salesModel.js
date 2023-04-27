const connection = require('./connection');

// const getAll = async () => {
//     const [products] = await connection.execute('SELECT * FROM StoreManager.sales_products ORDER BY id');
//     return { type: null, message: products };
// };

const createSale = async (sales) => {
  const [{ insertId: saleId }] = await connection.execute(
      'INSERT INTO StoreManager.sales (date) VALUES (NOW());'
  );

  let itemsSold = [];

  for (let index = 0; index < sales.length; index += 1) {
    const { productId, quantity } = sales[index];
    await connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);',
      [saleId, productId, quantity],
    );
    itemsSold.push({
      productId,
      quantity,
    })
  }
  const newSale = { id: saleId, itemsSold };
  return { type: null, message: newSale };
};

module.exports = { createSale };