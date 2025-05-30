const Product = require('../models/productModel');
const pool = require('../db');

// POST /api/products
exports.createProduct = async (req, res) => {
    const { name, price, description, image_url } = req.body;
  
    try {
      const result = await pool.query(
        'INSERT INTO products (name, price, description, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, price, description, image_url]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create product' }); // ✅ Fix here
    }
  };
  

// GET /api/products
exports.getAllProducts = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};



exports.search = async (req, res) => {
  const { q } = req.query;
  console.log('Search query:', q);

  const keywordMap = {
    sit: ['chair', 'sofa', 'bench', 'stool'],
    family: ['sofa', 'bench', 'dining table'],
    relax: ['sofa', 'recliner', 'bean bag'],
    sleep: ['bed', 'mattress', 'cot'],
    work: ['desk', 'chair', 'table'],
    wear: ['shirt', 't-shirt', 'pants'],
    store: ['shelf', 'cabinet', 'drawer'],
    cook: ['oven', 'stove', 'microwave'],
  };

  try {
    if (!q) {
      const all = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
      return res.json(all.rows);
    }

    const inputWords = q.toLowerCase().split(/\s+/);
    console.log('Input words:', inputWords);

    // Build search terms from keywords and synonyms
    const searchTerms = new Set();

    inputWords.forEach(word => {
      if (keywordMap[word]) {
        keywordMap[word].forEach(term => searchTerms.add(term));
      }
      searchTerms.add(word);
    });

    console.log('Search terms:', Array.from(searchTerms));

    const conditions = [];
    const values = [];

    Array.from(searchTerms).forEach((term, idx) => {
      const placeholder = `$${idx + 1}`;
      conditions.push(`LOWER(name) LIKE ${placeholder} OR LOWER(description) LIKE ${placeholder}`);
      values.push(`%${term}%`);
    });

    const query = `
      SELECT * FROM products
      WHERE ${conditions.join(' OR ')}
      ORDER BY created_at DESC
    `;

    console.log('Final query:', query);
    console.log('Values:', values);

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.json({ message: 'No products found' });
    }

    res.json(result.rows);

  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ error: 'Failed to search products' });
  }
};


//  Update a product
exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, image_url } = req.body;
  
    console.log('UPDATE request received with:', { id, name, description, price, image_url });
  
    if (!name || !price || !description) {
      return res.status(400).json({ error: "Name, price, and description are required." });
    }
  
    try {
      const result = await pool.query(
        'UPDATE products SET name=$1, description=$2, price=$3, image_url=$4 WHERE id=$5 RETURNING *',
        [name, description, price, image_url, id]
      );
  
      if (result.rows.length === 0) return res.status(404).json({ error: 'Product not found' });
  
      res.json(result.rows[0]);
    } catch (err) {
      console.error("Update error:", err);
      res.status(500).json({ error: 'Failed to update product' });
    }
  };
  
  
  //  Delete a product
  exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await pool.query('DELETE FROM products WHERE id=$1 RETURNING *', [id]);
  
      if (result.rows.length === 0) return res.status(404).json({ error: 'Product not found' });
  
      res.json({ message: 'Product deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete product' });
    }
  };
  

  exports.getProductById = async (req, res) => {
    const { id } = req.params;
    
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }
  
    try {
      const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
      
      if (result.rows.length === 0) {
        return res.status(404).json({ 
          error: 'Product not found',
          requestedId: id
        });
      }
      
      res.json(result.rows[0]);
    } catch (err) {
      console.error('Database error:', err);
      res.status(500).json({ 
        error: 'Database error',
        details: err.message 
      });
    }
  };