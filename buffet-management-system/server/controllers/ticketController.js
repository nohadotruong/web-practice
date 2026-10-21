const ticketRepository = require("../repositories/ticketRepository");

const ticketController = {
  async addTicket({ name, price }) {
    const errors = {};

    if (!name) errors.name = "Ticket name is required!";
    if (!price) errors.price = "Price is required!";
    if (Object.keys(errors).length > 0) {
      return { error: errors };
    }

    const result = await ticketRepository.addTicket({
      name,
      price,
    });

    if (result.error) {
      if (result.error.includes("Tickets")) {
        return {
          error: { name: result.error },
        };
      }

      return {
        error: {
          backend: "Backend error: " + result.error,
        },
      };
    }

    return result;
  },

  async getAllTicket() {
    const result = await ticketRepository.getAllTicket();
    return result;
  },

  async getTicketById({ id }) {
    const errors = {};

    if (!id) errors.id = "Ticket id is required!";
    if (Object.keys(errors).length > 0) {
      return { error: errors };
    }

    const result = await ticketRepository.getTicketById({
      id,
    });
    return result;
  },

  async updateTicketById({ id, price }) {
    const errors = {};

    if (!id) errors.id = "Ticket id is required!";
    if (!price) errors.price = "Price is required!";
    if (Object.keys(errors).length > 0) {
      return { error: errors };
    }

    const result = await ticketRepository.updateTicketById({
      id,
      price,
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

  async deleteTicketById({ id }) {
    const errors = {};

    if (!id) errors.id = "Ticket id is required!";
    if (Object.keys(errors).length > 0) {
      return { error: errors };
    }

    const existing = await ticketRepository.getTicketById({
      id,
    });
    if (!existing) {
      return { error: { id: "Ticket not found!" } };
    }

    await ticketRepository.deleteTicketById({ id });

    return { message: "Ticket deleted successfully!" };
  },
};

module.exports = ticketController;
