const connection = require('./connection');

const getAll = async () => {
    const [products] = await connection.execute('SELECT * FROM StoreManager.products ORDER BY id');
    return { type: null, message: products};
};

const getProductById = async (id) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?;',
    [id],
  );
  if (!product) return { type: 'NOT_FOUND', status: 404, message: 'Product not found' };
  return { type: null, message: product};
};

const createProduct = async (product) => {
  const { name } = product;
  const [{ insertId: id }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?);',
    [name],
  );
  const newProduct = { id, name };
  return { type: null, message: newProduct};
};

module.exports = { getAll, getProductById, createProduct };