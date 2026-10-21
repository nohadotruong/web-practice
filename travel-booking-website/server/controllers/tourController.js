import * as tourRepo from "../repositories/tourRepository.js";

export async function getAllTours() {
  return await tourRepo.getAllTours();
}

export async function getNewTours() {
  return await tourRepo.getNewTours();
}

export async function getTourById(tourId) {
  return await tourRepo.getTourById(tourId);
}

export async function createTour(tourData) {
  const errors = {};

  if (!tourData.name) {
    errors.name = "Tour name is required!";
  }

  if (!tourData.price) {
    errors.price = "Tour price is required!";
  }

  if (!tourData.start_date) {
    errors.start_date = "Start date is required!";
  }

  if (!tourData.end_date) {
    errors.end_date = "End date is required!";
  }

  if (!tourData.duration) {
    errors.duration = "Tour duration is required!";
  }

  if (!tourData.location) {
    errors.location = "Tour location is required!";
  }

  if (!tourData.description) {
    errors.description = "Tour description is required!";
  }

  if (Object.keys(errors).length > 0) {
    return { error: errors };
  }

  try {
    const result = await tourRepo.signUp(tourData);
    return result;
  } catch (error) {
    return {
      error: "Create tour failed! Error: " + error.message,
    };
  }
}

export async function updateTour(tourId, tourData) {
  const errors = {};

  if (!tourData.name) {
    errors.name = "Tour name is required!";
  }

  if (!tourData.price) {
    errors.price = "Tour price is required!";
  }

  if (!tourData.start_date) {
    errors.start_date = "Start date is required!";
  }

  if (!tourData.end_date) {
    errors.end_date = "End date is required!";
  }

  if (!tourData.duration) {
    errors.duration = "Tour duration is required!";
  }

  if (!tourData.location) {
    errors.location = "Tour location is required!";
  }

  if (!tourData.description) {
    errors.description = "Tour description is required!";
  }

  if (Object.keys(errors).length > 0) {
    return { error: errors };
  }

  try {
    const result = await tourRepo.updateTour(
      tourId,
      tourData
    );
    return result;
  } catch (error) {
    return {
      error: "Update tour failed! Error: " + error.message,
    };
  }
}

export async function deleteTour(tourId) {
  try {
    return await tourRepo.deleteTour(tourId);
  } catch (error) {
    return {
      error: "Delete tour failed! " + error.message,
    };
  }
}
