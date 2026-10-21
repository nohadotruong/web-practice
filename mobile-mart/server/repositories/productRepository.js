const db = require("../db/db");

const productRepository = {
  async addProduct({
    name,
    brand_id,
    series,
    screen_size,
    storage,
    ram,
    os,
    charging_port,
    release_date,
    price,
    quantity,
    status,
    thumbnail,
    image1,
    image2,
    image3,
  }) {
    try {
      const res = await db.query(
        `INSERT INTO products (
  name,
  brand_id,
  series,
  screen_size,
  storage,
  ram,
  os,
  charging_port,
  release_date,
  price,
  quantity,
  status,
  thumbnail,
  image1,
  image2,
  image3
) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *`,
        [
          name,
          brand_id,
          series,
          screen_size,
          storage,
          ram,
          os,
          charging_port,
          release_date,
          price,
          quantity,
          status,
          thumbnail,
          image1,
          image2,
          image3,
        ]
      );
      return res.rows[0];
    } catch (err) {
      if (err.code === "23505") {
        return { error: "Product already exists!" };
      }

      return {
        error: "Error: " + err,
      };
    }
  },
  async getAllProduct() {
    const res = await db.query(
      "SELECT * FROM products ORDER BY release_date DESC"
    );
    return res.rows;
  },
};

module.exports = productRepository;
