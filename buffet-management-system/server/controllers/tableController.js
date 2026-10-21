const tableRepository = require("../repositories/tableRepository");

const tableController = {
  async addTable({ seating_cap }) {
    const errors = {};

    if (!seating_cap)
      errors.seating_cap = "Seating capacity is required!";
    if (Object.keys(errors).length > 0) {
      return { error: errors };
    }

    const result = await tableRepository.addTable({
      seating_cap,
    });

    if (result.error) {
      if (result.error.includes("Seating")) {
        return { error: { seating_cap: result.error } };
      }

      return {
        error: {
          backend: "Backend error: " + result.error,
        },
      };
    }

    return result;
  },

  async getAllTable() {
    const result = await tableRepository.getAllTable();
    return result;
  },

  async getTableById(id) {
    const errors = {};

    if (!id) errors.id = "Table id is required!";
    if (Object.keys(errors).length > 0) {
      return { error: errors };
    }

    const result = await tableRepository.getTableById({
      id,
    });
    return result;
  },

  async getTableByFilter({ seating_cap, status }) {
    const errors = {};

    if (seating_cap === undefined || seating_cap === null)
      errors.seating_cap = "Table capacity is required!";

    if (!status)
      errors.status = "Table status is required!";

    if (Object.keys(errors).length > 0) {
      return { error: errors };
    }

    const result = await tableRepository.getTableByFilter({
      seating_cap,
      status,
    });
    return result;
  },

  async updateTableById({ id, seating_cap, status }) {
    const errors = {};

    if (!id) errors.id = "Table id is required!";
    if (!seating_cap)
      errors.seating_cap = "Seating capacity is required!";
    if (!status) errors.status = "Status is required!";
    if (Object.keys(errors).length > 0) {
      return { error: errors };
    }

    const result = await tableRepository.updateTableById({
      id,
      seating_cap,
      status,
    });

    if (result.error) {
      if (result.error.includes("Seating")) {
        return { error: { seating_cap: result.error } };
      }

      if (result.error.includes("Status")) {
        return { error: { status: result.error } };
      }

      return {
        error: {
          backend: "Backend error: " + result.error,
        },
      };
    }
    return result;
  },

  async updateTableStatusById({ id, status }) {
    const errors = {};

    if (!id) errors.id = "Table id is required!";
    if (!status) {
      errors.status = "Status is required!";
    }
    if (Object.keys(errors).length > 0) {
      return { error: errors };
    }

    const result =
      await tableRepository.updateTableStatusById({
        id,
        status,
      });

    if (result.error) {
      if (result.error.includes("Status")) {
        return { error: { status: result.error } };
      }

      return {
        error: {
          backend: "Backend error: " + result.error,
        },
      };
    }
    return result;
  },

  async deleteTableById({ id }) {
    const errors = {};

    if (!id) errors.id = "Table id is required!";
    if (Object.keys(errors).length > 0) {
      return { error: errors };
    }

    const existing = await tableRepository.getTableById({
      id,
    });
    if (!existing) {
      return { error: { id: "Table not found!" } };
    }

    await tableRepository.deleteTableById({ id });

    return { message: "Table deleted successfully!" };
  },
};

module.exports = tableController;
