const invoiceRepository = require("../repositories/invoiceRepository");

const invoiceController = {
  async addInvoice({
    date,
    start_time,
    table_id,
    subtotal,
    vat_amount,
    total,
    note,
  }) {
    const errors = {};

    if (!date) errors.date = "Date is required!";
    if (!start_time)
      errors.start_time = "Start Time is required!";
    if (!table_id)
      errors.table_id = "Table ID is required!";
    if (!subtotal)
      errors.subtotal = "Subtotal is required!";
    if (!vat_amount)
      errors.vat_amount = "VAT Amount is required!";
    if (!total) errors.total = "Total is required!";

    if (Object.keys(errors).length > 0) {
      return { error: errors };
    }

    const result = await invoiceRepository.addInvoice({
      date,
      start_time,
      table_id,
      subtotal,
      vat_amount,
      total,
      note,
    });

    if (result.error) {
      return {
        error: {
          backend: "Backend error: " + result.error,
        },
      };
    }

    return result;
  },

  async getAllInvoice() {
    const result = await invoiceRepository.getAllInvoice();
    return result;
  },

  async getInvoiceById({ id }) {
    const errors = {};

    if (!id) errors.id = "Invoice id is required!";
    if (Object.keys(errors).length > 0) {
      return { error: errors };
    }

    const result = await invoiceRepository.getInvoiceById({
      id,
    });
    return result;
  },

  async getUnpaidInvoice({ table_id }) {
    const errors = {};

    if (!table_id)
      errors.table_id = "Table ID is required!";

    if (Object.keys(errors).length > 0) {
      return { error: errors };
    }

    const result = await invoiceRepository.getUnpaidInvoice(
      { table_id }
    );
    return result;
  },

  async getInvoiceByStatus({ status }) {
    const errors = {};

    if (!status) errors.status = "Status is required!";
    if (Object.keys(errors).length > 0) {
      return { error: errors };
    }

    const result =
      await invoiceRepository.getInvoiceByStatus({
        status,
      });
    return result;
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
    const errors = {};

    if (!date) errors.date = "Date is required!";
    if (!start_time)
      errors.start_time = "Start Time is required!";

    if (!table_id)
      errors.table_id = "Table ID is required!";
    if (!subtotal)
      errors.subtotal = "Subtotal is required!";
    if (!vat_amount)
      errors.vat_amount = "VAT Amount is required!";
    if (!total) errors.total = "Total is required!";
    if (!status) errors.status = "Status is required!";

    if (Object.keys(errors).length > 0) {
      return { error: errors };
    }

    const result =
      await invoiceRepository.updateInvoiceById({
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
      });

    if (result.error) {
      return {
        error: {
          backend: "Backend error: " + result.error,
        },
      };
    }
    return result;
  },

  async deleteInvoiceById({ id }) {
    const errors = {};

    if (!id) errors.id = "Invoice ID is required!";
    if (Object.keys(errors).length > 0) {
      return { error: errors };
    }

    const existing = await invoiceRepository.getInvoiceById(
      {
        id,
      }
    );
    if (!existing) {
      return { error: { id: "Invoice not found!" } };
    }

    await invoiceRepository.deleteInvoiceById({ id });

    return { message: "Invoice deleted successfully!" };
  },
};

module.exports = invoiceController;
