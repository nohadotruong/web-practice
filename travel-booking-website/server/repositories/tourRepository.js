import db from "../config/db.js";

export async function addTour(tourData) {
  try {
    await db.query(
      `INSERT INTO tours (name_vi, name_en, price, start_date, end_date, location_id, description_vi, description_en, thumbnail) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        tourData.name_vi,
        tourData.name_en,
        tourData.price,
        tourData.start_date,
        tourData.end_date,
        tourData.location_id,
        tourData.description_vi,
        tourData.description_en,
        tourData.thumbnail,
      ]
    );

    return { message: "ADD_TOUR_SUCCESS" };
  } catch (error) {
    return {
      errorCode: "ADD_TOUR_FAILED",
      message: error.message,
    };
  }
}

export async function getAllTours() {
  const result = await db.query("SELECT * FROM tours");
  return { tourList: result };
}

export async function getTourById(tourId) {
  try {
    const result = await db.query(
      "SELECT * FROM tours WHERE id = $1",
      [tourId]
    );

    return { tourInfo: result.rows[0] };
  } catch (error) {
    return {
      error: "Fetch tour failed! Error: " + error.message,
    };
  }
}

export async function updateTourById(tourId, tourData) {
  try {
    const result = await db.query(
      `UPDATE tours 
       SET name_vi = $1, name_en = $2, price = $3, start_date = $4, end_date = $5, location_id = $6, description_vi = $7, description_en = $8, thumbnail = $9
       WHERE id = $10 RETURNING *`,
      [
        tourData.tourname,
        tourData.email,
        tourData.phone,
        tourData.fullname,
        tourData.role,
        tourId,
      ]
    );

    return { tourInfo: result };
  } catch (error) {
    return {
      errorCode: "UPDATE_TOUR_FAILED",
      message: error.message,
    };
  }
}

export async function deleteTourById(tourId) {
  try {
    const result = await db.query(
      "DELETE FROM tours WHERE id = $1 RETURNING *",
      [tourId]
    );

    if (result.rowCount === 0) {
      return { errors: "TOUR_NOT_FOUND" };
    }

    return { tourInfo: result.rows[0] };
  } catch (error) {
    return {
      errorCode: "DELETE_TOUR_FAILED",
      message: error.message,
    };
  }
}
