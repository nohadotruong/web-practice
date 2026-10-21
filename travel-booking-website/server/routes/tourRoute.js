import express from "express";
import * as tourCtrl from "../controllers/tourController.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { tourList } = await tourCtrl.getAllTours();

    return res.status(200).json({
      message: "Fetch tours successfully!",
      tourList,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Fetch tours failed!",
      error: error.message,
    });
  }
});

router.get("/newtour", async (req, res) => {
  try {
    const { tourList } = await tourCtrl.getNewTours();

    return res.status(200).json({
      message: "Fetch tours successfully!",
      tourList,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Fetch tours failed!",
      error: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  const tourId = req.params.id;
  try {
    const { tourInfo } = await tourCtrl.getTourById(tourId);

    if (!tourInfo) {
      return res
        .status(404)
        .json({ error: "Tour not found" });
    }

    return res.status(200).json({
      message: "Fetch tour successfully!",
      tourInfo,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Fetch tour failed!",
      error: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await tourCtrl.createTour(req.body);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    return res.status(201).json({
      message: "Create tour successfully!",
      tourInfo: result.tourInfo,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Create tour failed!",
      error: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  const tourId = req.params.id;

  try {
    const result = await tourCtrl.updateTour(
      tourId,
      req.body
    );

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    if (!result.tourInfo) {
      return res
        .status(404)
        .json({ error: "Tour not found" });
    }

    return res.status(200).json({
      message: "Update tour successfully!",
      tourInfo: result.tourInfo,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Update tour failed!",
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  const tourId = req.params.id;
  try {
    const result = await tourCtrl.deleteTour(tourId);

    if (result.error) {
      return res.status(400).json({
        message: "Delete tour failed!",
        error: result.error,
      });
    }

    return res.status(200).json({
      message: "Delete tour successfully!",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Internal Server Error!" });
  }
});

export default router;
