const express = require("express");
const invoiceDetailController = require("../controllers/invoiceDetailController");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const allowRoles = require("../middlewares/roleMiddleware");

router.post("/", authMiddleware, async (req, res) => {
  try {
    const result =
      await invoiceDetailController.addInvoiceDetail(
        req.body
      );

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    return res.status(201).json({
      message: "Add Invoice Detail successfully!",
      invoice_detail: result,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error!" });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const result =
      await invoiceDetailController.getAllInvoiceDetail();
    return res.status(200).json({
      message: "Get Invoice Detail successfully!",
      invoice_details: result,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error!" });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  const invoiceDetailId = req.params.id;
  try {
    const result =
      await invoiceDetailController.getInvoiceDetailById({
        id: invoiceDetailId,
      });
    return res.status(200).json({
      message: "Get Invoice Detail successfully!",
      invoice_detail: result,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error!" });
  }
});

router.get(
  "/by-invoice/:id",
  authMiddleware,
  async (req, res) => {
    const invoiceId = req.params.id;
    try {
      const result =
        await invoiceDetailController.getInvoiceDetailByInvoiceId(
          {
            invoice_id: invoiceId,
          }
        );
      return res.status(200).json({
        message: "Get Invoice Detail successfully!",
        invoice_details: result,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Internal Server Error!" });
    }
  }
);

router.put(
  "/:id",
  authMiddleware,
  allowRoles("Manager"),
  async (req, res) => {
    const invoiceDetailId = req.params.id;
    try {
      const result =
        await invoiceDetailController.updateInvoiceDetailById(
          {
            id: invoiceDetailId,
            ...req.body,
          }
        );

      if (result.error) {
        return res.status(400).json({
          message: "Update Invoice Detail failed!",
          error: result.error,
        });
      }

      return res.status(200).json({
        message: "Update Invoice Detail successfully!",
        invoice_detail: result,
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
    const invoiceDetailId = req.params.id;
    try {
      const result =
        await invoiceDetailController.deleteInvoiceDetailById(
          {
            invoiceDetailId,
          }
        );

      if (result.error) {
        return res.status(400).json({
          message: "Delete Invoice Detail failed!",
          error: result.error,
        });
      }

      return res.status(200).json({
        message: "Delete Invoice Detail successfully!",
      });
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Internal Server Error!" });
    }
  }
);

router.delete(
  "/by-invoice/:id",
  authMiddleware,
  async (req, res) => {
    const invoiceId = req.params.id;
    try {
      const result =
        await invoiceDetailController.deleteInvoiceDetailByInvoiceId(
          {
            invoice_id: invoiceId,
          }
        );

      if (result.error) {
        return res.status(400).json({
          message: "Delete Invoice Detail failed!",
          error: result.error,
        });
      }

      return res.status(200).json({
        message: "Delete Invoice Detail successfully!",
      });
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Internal Server Error!" });
    }
  }
);

module.exports = router;
