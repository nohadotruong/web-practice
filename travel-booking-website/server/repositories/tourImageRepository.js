import db from "../config/db.js";

export async function addtourImage(tourImageData) {
  try {
    await db.query(
      `INSERT INTO tour_images (tour_id, url) VALUES ($1, $2)`,
      [tourImageData.tour_id, tourImageData.url]
    );

    return { message: "ADD_TOUR_IMAGE_SUCCESS" };
  } catch (error) {
    return {
      errorCode: "ADD_TOUR_IMAGE_FAILED",
      message: error.message,
    };
  }
}

export async function getAlltourImages() {
  const result = await db.query(
    "SELECT * FROM tour_images"
  );
  return { tourImageList: result };
}

export async function gettourImageById(tourImageId) {
  try {
    const result = await db.query(
      "SELECT * FROM tour_images WHERE id = $1",
      [tourImageId]
    );

    return { tourImageInfo: result.rows[0] };
  } catch (error) {
    return {
      error:
        "Fetch tour image failed! Error: " + error.message,
    };
  }
}

export async function updatetourImageById(
  tourImageId,
  tourImageData
) {
  try {
    const result = await db.query(
      `UPDATE tour_images 
       SET tour_id = $1, url = $2 WHERE id = $3 RETURNING *`,
      [
        tourImageData.tour_id,
        tourImageData.url,
        tourImageId,
      ]
    );

    return { tourImageInfo: result };
  } catch (error) {
    return {
      errorCode: "UPDATE_TOUR_IMAGE_FAILED",
      message: error.message,
    };
  }
}

export async function deletetourImageById(tourImageId) {
  try {
    const result = await db.query(
      "DELETE FROM tour_images WHERE id = $1 RETURNING *",
      [tourImageId]
    );

    if (result.rowCount === 0) {
      return { errors: "TOUR_IMAGE_NOT_FOUND" };
    }

    return { tourImageInfo: result.rows[0] };
  } catch (error) {
    return {
      errorCode: "DELETE_TOUR_IMAGE_FAILED",
      message: error.message,
    };
  }
}
