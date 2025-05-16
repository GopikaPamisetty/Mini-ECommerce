const db = require('../db');

const createProduct = async (product) => {
  const { name, price, description, image } = product;
  const result = await db.query(
    `INSERT INTO products (name, price, description, image)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [name, price, description, image]
  );
  return result.rows[0];
};

const getAllProducts = async () => {
  const result = await db.query('SELECT * FROM products ORDER BY id DESC');
  return result.rows;
};

const searchProducts = async (query) => {
  const keywords = query.toLowerCase().split(' ');
  const conditions = keywords.map((word, idx) =>
    `(LOWER(name) LIKE $${idx + 1} OR LOWER(description) LIKE $${idx + 1})`
  );
  const values = keywords.map(word => `%${word}%`);
  const sql = `SELECT * FROM products WHERE ${conditions.join(' OR ')}`;
  const result = await pool.query(sql, values);
  return result.rows;
}

module.exports = { createProduct, getAllProducts, searchProducts };
