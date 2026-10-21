const db = require("../db/db");

const invoicedetailRepository = {
  async addInvoiceDetail({
    invoice_id,
    ticket_id,
    quantity,
  }) {
    try {
      const result = await db.query(
        "INSERT INTO invoice_details (invoice_id, ticket_id, quantity) VALUES ($1, $2, $3) RETURNING *",
        [invoice_id, ticket_id, quantity]
      );

      return result.rows[0];
    } catch (err) {
      return { error: "Error: " + err };
    }
  },

  async getAllInvoiceDetail() {
    const result = await db.query(
      "SELECT * FROM invoice_details ORDER BY id ASC"
    );
    return result.rows;
  },

  async getInvoiceDetailById({ id }) {
    const result = await db.query(
      "SELECT * FROM invoice_details WHERE id = $1",
      [id]
    );
    return result.rows[0];
  },

  async getInvoiceDetailByInvoiceId({ invoice_id }) {
    const result = await db.query(
      "SELECT * FROM invoice_details WHERE invoice_id = $1",
      [invoice_id]
    );
    return result.rows;
  },

  async updateInvoiceDetailById({
    id,
    invoice_id,
    ticket_id,
    quantity,
  }) {
    try {
      const result = await db.query(
        "UPDATE invoice_details SET invoice_id = $1, ticket_id = $2, quantity = $3 WHERE id = $4 RETURNING *",
        [invoice_id, ticket_id, quantity, id]
      );
      return result.rows[0];
    } catch (err) {
      return { error: "Error: " + err };
    }
  },

  async deleteInvoiceDetailById({ id }) {
    await db.query(
      "DELETE FROM invoice_details WHERE id = $1",
      [id]
    );
  },

  async deleteInvoiceDetailByInvoiceId({ invoice_id }) {
    await db.query(
      "DELETE FROM invoice_details WHERE invoice_id = $1",
      [invoice_id]
    );
  },
};

module.exports = invoicedetailRepository;
