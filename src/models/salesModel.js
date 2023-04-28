const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute(`
    SELECT 
      sp.sale_id as saleId,
      sp.product_id as productId,
      sp.quantity,
      s.date 
    FROM StoreManager.sales_products as sp
    INNER JOIN StoreManager.sales as s on s.id = sp.sale_id
    ORDER BY sp.sale_id
  `);

  return result;
};

const getSaleById = async (saleId) => {
  const [result] = await connection.execute(`
    SELECT 
      sp.product_id as productId,
      sp.quantity,
      s.date 
    FROM StoreManager.sales_products as sp
    INNER JOIN StoreManager.sales as s on s.id = sp.sale_id
    WHERE sp.sale_id = ?;
  `,
    [saleId]);

  console.log('result', result);
  return result;
};

const createSale = async (sales) => {
  const [{ insertId: saleId }] = await connection.execute(
      'INSERT INTO StoreManager.sales (date) VALUES (NOW());',
  );
  console.log('saleid =>', saleId);
  const promises = sales.map(async (sale) => {
    const { productId, quantity } = sale;
    const result = await connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);',
      [saleId, productId, quantity],
    );
    console.log('result => ', result);
    // return { productId, quantity };
  });
  console.log('promises before => ', promises);
  // const itemsSold = await Promise.all(promises);
  await Promise.all(promises);
  console.log('promises after => ', promises);
  const newSale = { id: saleId, itemsSold: sales };
  return newSale;
};

module.exports = { createSale, getAll, getSaleById };