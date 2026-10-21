const express = require("express");
const ticketController = require("../controllers/ticketController");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const allowRoles = require("../middlewares/roleMiddleware");

router.post(
  "/",
  authMiddleware,
  allowRoles("Manager"),
  async (req, res) => {
    try {
      const result = await ticketController.addTicket(
        req.body
      );

      if (result.error) {
        return res
          .status(400)
          .json({ error: result.error });
      }

      return res.status(201).json({
        message: "Add tickets successfully!",
        ticket: result,
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
    const result = await ticketController.getAllTicket();
    return res.status(200).json({
      message: "Get ticket successfully!",
      tickets: result,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error!" });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  const ticketId = req.params.id;
  try {
    const result = await ticketController.getTicketById({
      id: ticketId,
    });
    return res.status(200).json({
      message: "Get ticket successfully!",
      ticket: result,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error!" });
  }
});

router.put(
  "/:id",
  authMiddleware,
  allowRoles("Manager"),
  async (req, res) => {
    const ticketId = req.params.id;
    try {
      const result =
        await ticketController.updateTicketById({
          id: ticketId,
          ...req.body,
        });

      if (result.error) {
        return res.status(400).json({
          message: "Update ticket failed!",
          error: result.error,
        });
      }

      return res.status(200).json({
        message: "Update ticket successfully!",
        ticket: result,
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
    const ticketId = req.params.id;
    try {
      const result =
        await ticketController.deleteTicketById({
          id: ticketId,
        });

      if (result.error) {
        return res.status(400).json({
          message: "Delete ticket failed!",
          error: result.error,
        });
      }

      return res.status(200).json({
        message: "Delete ticket successfully!",
      });
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Internal Server Error!" });
    }
  }
);

module.exports = router;
