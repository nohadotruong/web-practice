const db = require("../db/db");

const BrandRepository = {
  async addBrand({ name }) {
    try {
      const res = await db.query(
        `INSERT INTO brands (name) VALUES ($1) RETURNING *`,
        [name]
      );

      return res.rows[0];
    } catch (err) {
      if (err.code === "23505") {
        return {
          error: "Brand name already exists!",
        };
      }

      return {
        error: "Error: " + err,
      };
    }
  },

  async getAllCategories() {
    const res = await db.query(
      "SELECT * FROM brands ORDER BY id ASC"
    );
    return res.rows;
  },

  async deleteBrandById(id) {
    await db.query("DELETE FROM brands WHERE id = $1", [
      id,
    ]);
  },
};

module.exports = BrandRepository;
