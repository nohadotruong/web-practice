const db = require("../db/db");

const ticketRepository = {
  async addTicket({ name, price }) {
    try {
      const result = await db.query(
        "INSERT INTO tickets (name, price) VALUES ($1, $2) RETURNING *",
        [name, price]
      );

      return result.rows[0];
    } catch (err) {
      if (err.code === "23505") {
        return { error: "Tickets already exists!" };
      }

      return { error: "Error: " + err };
    }
  },

  async getAllTicket() {
    const result = await db.query(
      "SELECT * FROM tickets ORDER BY id ASC"
    );
    return result.rows;
  },

  async getTicketById({ id }) {
    const result = await db.query(
      "SELECT * FROM tickets WHERE id = $1",
      [id]
    );
    return result.rows[0];
  },

  async updateTicketById({ id, price }) {
    try {
      const result = await db.query(
        "UPDATE tickets SET price = $1 WHERE id = $2 RETURNING *",
        [price, id]
      );
      return result.rows[0];
    } catch (err) {
      return { error: "Error: " + err };
    }
  },

  async deleteTicketById({ id }) {
    await db.query("DELETE FROM tickets WHERE id = $1", [
      id,
    ]);
  },
};

module.exports = ticketRepository;
