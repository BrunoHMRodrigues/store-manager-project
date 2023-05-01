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

const createSale = async () => {
  const [{ insertId: saleId }] = await connection.execute(
      'INSERT INTO StoreManager.sales (date) VALUES (NOW());',
  );

  return saleId;
};

const createSaleProduct = async (saleId, sale) => {
  const { productId, quantity } = sale;
  await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);',
    [saleId, productId, quantity],
  );
};

const deleteSaleById = async (saleId) => {
  await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [saleId],
  );
};

const deleteSaleProductsById = async (saleId) => {
  await connection.execute(
    'DELETE FROM StoreManager.sales_products WHERE sale_id = ?',
    [saleId],
  );
};

module.exports = {
  createSale,
  createSaleProduct,
  getAll,
  getSaleById,
  deleteSaleById,
  deleteSaleProductsById,
};