const connection = require('./connection');


const getAll = async () => {
  const [products] = await connection.execute('SELECT * FROM StoreManager.products ORDER BY id');
  return products;
};

const getProductById = async (id) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id]
  )
  return product;
}

module.exports = { getAll, getProductById };