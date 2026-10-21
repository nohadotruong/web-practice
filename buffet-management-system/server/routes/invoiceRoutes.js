const express = require("express");
const invoiceController = require("../controllers/invoiceController");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const allowRoles = require("../middlewares/roleMiddleware");

router.post("/", authMiddleware, async (req, res) => {
  try {
    const result = await invoiceController.addInvoice(
      req.body
    );

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    return res.status(201).json({
      message: "Add invoice successfully!",
      invoice: result,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error!" });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const result = await invoiceController.getAllInvoice();
    return res.status(200).json({
      message: "Get invoices successfully!",
      invoices: result,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error!" });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  const invoiceId = req.params.id;
  try {
    const result = await invoiceController.getInvoiceById({
      id: invoiceId,
    });
    return res.status(200).json({
      message: "Get invoice successfully!",
      invoice: result,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error!" });
  }
});

router.get(
  "/by-table/:id",
  authMiddleware,
  async (req, res) => {
    const tableId = req.params.id;

    try {
      const result =
        await invoiceController.getUnpaidInvoice({
          table_id: tableId,
        });
      return res.status(200).json({
        message: "Get invoice successfully!",
        invoice: result,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Internal Server Error!" });
    }
  }
);

router.get(
  "/by-status/:status",
  authMiddleware,
  async (req, res) => {
    const ivStatus = req.params.status;

    try {
      const result =
        await invoiceController.getInvoiceByStatus({
          status: ivStatus,
        });
      return res.status(200).json({
        message: "Get invoices successfully!",
        invoices: result,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Internal Server Error!" });
    }
  }
);

router.put("/:id", authMiddleware, async (req, res) => {
  const invoiceId = req.params.id;
  try {
    const result =
      await invoiceController.updateInvoiceById({
        id: invoiceId,
        ...req.body,
      });

    if (result.error) {
      return res.status(400).json({
        message: "Update invoice failed!",
        error: result.error,
      });
    }

    return res.status(200).json({
      message: "Update invoice successfully!",
      invoice: result,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Internal Server Error!" });
  }
});

router.delete(
  "/:id",
  authMiddleware,
  allowRoles("Manager"),
  async (req, res) => {
    const invoiceId = req.params.id;
    try {
      const result =
        await invoiceController.deleteInvoiceById({
          id: invoiceId,
        });

      if (result.error) {
        return res.status(400).json({
          message: "Delete invoice failed!",
          error: result.error,
        });
      }

      return res.status(200).json({
        message: "Delete invoice successfully!",
      });
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Internal Server Error!" });
    }
  }
);

module.exports = router;
