const connection = require('./connection');

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
  const newSale = { id: saleId, itemsSold: saleId };
  return newSale;
};

module.exports = { createSale };