const db = require("../db/db");

const tableRepository = {
  async addTable({ seating_cap }) {
    try {
      const result = await db.query(
        "INSERT INTO tables (seating_cap) VALUES ($1) RETURNING *",
        [seating_cap]
      );

      return result.rows[0];
    } catch (err) {
      if (err.code === "23514") {
        return { error: "Seating capacity invalid!" };
      }

      return { error: "Error: " + err };
    }
  },

  async getAllTable() {
    const result = await db.query(
      "SELECT * FROM tables ORDER BY id ASC"
    );
    return result.rows;
  },

  async getTableById({ id }) {
    const result = await db.query(
      "SELECT * FROM tables WHERE id = $1",
      [id]
    );
    return result.rows[0];
  },

  async getTableByFilter({ seating_cap, status }) {
    let result;

    if (status === "All" && seating_cap === 0) {
      result = await db.query(
        "SELECT * FROM tables ORDER BY id ASC"
      );
    } else if (status === "All") {
      result = await db.query(
        "SELECT * FROM tables WHERE seating_cap = $1 ORDER BY id ASC",
        [seating_cap]
      );
    } else if (seating_cap === 0) {
      result = await db.query(
        "SELECT * FROM tables WHERE status = $1 ORDER BY id ASC",
        [status]
      );
    } else {
      result = await db.query(
        "SELECT * FROM tables WHERE seating_cap = $1 AND status = $2 ORDER BY id ASC",
        [seating_cap, status]
      );
    }

    return result.rows;
  },

  async updateTableById({ id, seating_cap, status }) {
    try {
      const result = await db.query(
        "UPDATE tables SET seating_cap = $1, status = $2 WHERE id = $3 RETURNING *",
        [seating_cap, status, id]
      );

      return result.rows[0];
    } catch (err) {
      if (err.code === "23514") {
        return { error: "Seating capacity invalid!" };
      }

      if (err.code === "23514") {
        return { error: "Status invalid!" };
      }

      return { error: "Error: " + err };
    }
  },

  async updateTableStatusById({ id, status }) {
    try {
      const result = await db.query(
        "UPDATE tables SET status = $1 WHERE id = $2 RETURNING *",
        [status, id]
      );

      return result.rows[0];
    } catch (err) {
      if (err.code === "23514") {
        return { error: "Status invalid!" };
      }

      return { error: "Error: " + err };
    }
  },

  async deleteTableById({ id }) {
    await db.query("DELETE FROM tables WHERE id = $1", [
      id,
    ]);
  },
};

module.exports = tableRepository;
