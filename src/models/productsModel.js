const connection = require('./connection');

const getAll = async () => {
    const [products] = await connection.execute('SELECT * FROM StoreManager.products ORDER BY id');
    return products;
};

const getProductById = async (id) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?;',
    [id],
  );
  return product;
};

const createProduct = async (product) => {
  const { name } = product;
  const [{ insertId: id }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?);',
    [name],
  );
  return { id, name}
};

module.exports = { getAll, getProductById, createProduct };