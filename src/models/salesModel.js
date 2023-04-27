const connection = require('./connection');

// const getAll = async () => {
//     const [products] = await connection.execute('SELECT * FROM StoreManager.sales_products ORDER BY id');
//     return { type: null, message: products };
// };

const createSale = async (sales) => {
  const [{ insertId: saleId }] = await connection.execute(
      'INSERT INTO StoreManager.sales (date) VALUES (NOW());',
  );

  const promises = sales.map(async (sale) => {
    const { productId, quantity } = sale;
    await connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);',
      [saleId, productId, quantity],
    );
    return { productId, quantity };
  });

  const itemsSold = await Promise.all(promises);

  const newSale = { id: saleId, itemsSold };
  // return { type: null, message: newSale };
  return newSale;
};

module.exports = { createSale };