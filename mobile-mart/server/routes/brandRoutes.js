const express = require("express");
const router = express.Router();

const BrandController = require("../controller/brandController");

router.get("/", async (req, res) => {
  try {
    const brands = await BrandController.getAllBrands();
    res.json(brands);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error!" });
  }
});

module.exports = router;
