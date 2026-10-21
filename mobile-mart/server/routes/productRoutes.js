const express = require("express");
const productController = require("../controller/productController");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

router.post(
  "/add_products",
  // authMiddleware,
  async (req, res) => {
    try {
      const result = await productController.addProduct(
        req.body
      );

      if (result.error) {
        return res
          .status(400)
          .json({ error: result.error });
      }

      return res.status(201).json({
        message: "Add product successfully!",
        product: result,
      });
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Internal Server Error!" });
    }
  }
);

module.exports = router;
