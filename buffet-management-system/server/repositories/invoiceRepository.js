const db = require("../db/db");

const invoiceRepository = {
  async addInvoice({
    date,
    start_time,
    table_id,
    subtotal,
    vat_amount,
    total,
    note,
  }) {
    try {
      const result = await db.query(
        "INSERT INTO invoices (date, start_time, table_id, subtotal, vat_amount, total, note) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        [
          date,
          start_time,
          table_id,
          subtotal,
          vat_amount,
          total,
          note,
        ]
      );

      return result.rows[0];
    } catch (err) {
      return { error: "Error: " + err };
    }
  },

  async getAllInvoice() {
    const result = await db.query(
      "SELECT * FROM invoices ORDER BY date DESC, start_time DESC"
    );
    return result.rows;
  },

  async getInvoiceById({ id }) {
    const result = await db.query(
      "SELECT * FROM invoices WHERE id = $1",
      [id]
    );
    return result.rows[0];
  },

  async getUnpaidInvoice({ table_id }) {
    const result = await db.query(
      "SELECT * FROM invoices WHERE table_id = $1 AND status = 'Unpaid' AND end_time IS NULL",
      [table_id]
    );
    return result.rows[0];
  },

  async getInvoiceByStatus({ status }) {
    const result = await db.query(
      "SELECT * FROM invoices WHERE status = $1 ORDER BY date DESC, start_time DESC",
      [status]
    );
    return result.rows;
  },

  async updateInvoiceById({
    id,
    date,
    start_time,
    end_time,
    table_id,
    subtotal,
    vat_amount,
    total,
    amount_paid,
    status,
    note,
  }) {
    try {
      const result = await db.query(
        "UPDATE invoices SET date = $1, start_time = $2, end_time = $3, table_id = $4, subtotal = $5, vat_amount = $6, total = $7, amount_paid = $8, status = $9, note = $10 WHERE id = $11 RETURNING *",
        [
          date,
          start_time,
          end_time,
          table_id,
          subtotal,
          vat_amount,
          total,
          amount_paid,
          status,
          note,
          id,
        ]
      );
      return result.rows[0];
    } catch (err) {
      return { error: "Error: " + err };
    }
  },

  async deleteInvoiceById({ id }) {
    await db.query("DELETE FROM invoices WHERE id = $1", [
      id,
    ]);
  },
};

module.exports = invoiceRepository;
