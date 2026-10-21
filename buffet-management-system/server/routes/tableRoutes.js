const express = require("express");
const tableController = require("../controllers/tableController");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const allowRoles = require("../middlewares/roleMiddleware");

router.post(
  "/",
  authMiddleware,
  allowRoles("Manager"),
  async (req, res) => {
    try {
      const result = await tableController.addTable(
        req.body
      );

      if (result.error) {
        return res
          .status(400)
          .json({ error: result.error });
      }

      return res.status(201).json({
        message: "Add table successfully!",
        table: result,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Internal Server Error!" });
    }
  }
);

router.get("/", authMiddleware, async (req, res) => {
  try {
    const result = await tableController.getAllTable();
    return res.status(200).json({
      message: "Get table successfully!",
      tables: result,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error!" });
  }
});

router.get(
  "/by-id/:id",
  authMiddleware,
  async (req, res) => {
    const tableId = req.params.id;
    try {
      const result = await tableController.getTableById(
        tableId
      );
      return res.status(200).json({
        message: "Get table successfully!",
        table: result,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Internal Server Error!" });
    }
  }
);

router.get(
  "/by-filter/:seating_cap/:status",
  authMiddleware,
  async (req, res) => {
    const tableStatus = req.params.status;
    const tableCap = parseInt(req.params.seating_cap, 10);
    try {
      const result = await tableController.getTableByFilter(
        { seating_cap: tableCap, status: tableStatus }
      );
      return res.status(200).json({
        message: "Get tables successfully!",
        tables: result,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Internal Server Error!" });
    }
  }
);

router.put("/:id", authMiddleware, async (req, res) => {
  const tableId = req.params.id;
  try {
    const result = await tableController.updateTableById({
      id: tableId,
      ...req.body,
    });

    if (result.error) {
      return res.status(400).json({
        message: "Update table failed!",
        error: result.error,
      });
    }

    return res.status(200).json({
      message: "Update table successfully!",
      table: result,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Internal Server Error!" });
  }
});

router.put(
  "/update-status/:id",
  authMiddleware,
  async (req, res) => {
    const tableId = req.params.id;

    console.log(tableId);

    try {
      const result =
        await tableController.updateTableStatusById({
          id: tableId,
          ...req.body,
        });

      if (result.error) {
        return res.status(400).json({
          message: "Update table status failed!",
          error: result.error,
        });
      }

      return res.status(200).json({
        message: "Update table status successfully!",
        table: result,
      });
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Internal Server Error!" });
    }
  }
);

router.delete(
  "/:id",
  authMiddleware,
  allowRoles("Manager"),
  async (req, res) => {
    const tableId = req.params.id;
    try {
      const result = await tableController.deleteTableById({
        id: tableId,
      });

      if (result.error) {
        return res.status(400).json({
          message: "Delete table failed!",
          error: result.error,
        });
      }

      return res.status(200).json({
        message: "Delete table successfully!",
      });
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Internal Server Error!" });
    }
  }
);

module.exports = router;
