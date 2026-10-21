const invoiceDetailRepository = require("../repositories/invoiceDetailRepository");

const invoiceDetailController = {
  async addInvoiceDetail({
    invoice_id,
    ticket_id,
    quantity,
  }) {
    const errors = {};

    if (!invoice_id)
      errors.invoice_id = "Invoice ID is required!";
    if (!ticket_id)
      errors.ticket_id = "Ticket type is required!";
    if (!quantity)
      errors.quantity = "Quantity is required!";

    if (Object.keys(errors).length > 0) {
      return { error: errors };
    }

    const result =
      await invoiceDetailRepository.addInvoiceDetail({
        invoice_id,
        ticket_id,
        quantity,
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

  async getAllInvoiceDetail() {
    const result =
      await invoiceDetailRepository.getAllInvoiceDetail();
    return result;
  },

  async getInvoiceDetailById({ id }) {
    const errors = {};

    if (!id) errors.id = "Invoice Detail ID is required!";
    if (Object.keys(errors).length > 0) {
      return { error: errors };
    }

    const result =
      await invoiceDetailRepository.getInvoiceDetailById({
        id,
      });
    return result;
  },

  async getAllInvoiceDetail() {
    const result =
      await invoiceDetailRepository.getAllInvoiceDetail();
    return result;
  },

  async getInvoiceDetailByInvoiceId({ invoice_id }) {
    const errors = {};

    if (!invoice_id)
      errors.invoice_id = "Invoice ID is required!";
    if (Object.keys(errors).length > 0) {
      return { error: errors };
    }

    const result =
      await invoiceDetailRepository.getInvoiceDetailByInvoiceId(
        {
          invoice_id,
        }
      );
    return result;
  },

  async updateInvoiceDetailById({
    id,
    invoice_id,
    ticket_id,
    quantity,
  }) {
    const errors = {};

    if (!id) errors.id = "Invoice Detail ID is required!";
    if (!invoice_id)
      errors.invoice_id = "Invoice ID is required!";
    if (!ticket_id)
      errors.ticket_id = "Ticket type is required!";
    if (!quantity)
      errors.quantity = "Quantity is required!";

    if (Object.keys(errors).length > 0) {
      return { error: errors };
    }

    const result =
      await invoiceDetailRepository.updateInvoiceDetailById(
        {
          id,
          invoice_id,
          ticket_id,
          quantity,
        }
      );

    if (result.error) {
      return {
        error: {
          backend: "Backend error: " + result.error,
        },
      };
    }
    return result;
  },

  async deleteInvoiceDetailById({ id }) {
    const errors = {};

    if (!id) errors.id = "Invoice Detail ID is required!";
    if (Object.keys(errors).length > 0) {
      return { error: errors };
    }

    const existing =
      await invoiceDetailRepository.getInvoiceDetailById({
        id,
      });
    if (!existing) {
      return { error: { id: "Invoice Detail not found!" } };
    }

    await invoiceDetailRepository.deleteInvoiceDetailById({
      id,
    });

    return {
      message: "Invoice Detail deleted successfully!",
    };
  },

  async deleteInvoiceDetailByInvoiceId({ invoice_id }) {
    const errors = {};

    if (!invoice_id)
      errors.invoice_id = "Invoice ID is required!";
    if (Object.keys(errors).length > 0) {
      return { error: errors };
    }

    const existing =
      await invoiceDetailRepository.getInvoiceDetailByInvoiceId(
        {
          invoice_id,
        }
      );
    if (!existing) {
      return { error: { id: "Invoice Detail not found!" } };
    }

    await invoiceDetailRepository.deleteInvoiceDetailByInvoiceId(
      {
        invoice_id,
      }
    );

    return {
      message: "Invoice Detail deleted successfully!",
    };
  },
};

module.exports = invoiceDetailController;
