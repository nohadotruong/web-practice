import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import * as userRepo from "../repositories/userRepository.js";
import * as roleRepo from "../repositories/roleRepository.js";

import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export async function signInUser(userData) {
  const errors = {};

  if (!userData.username)
    errors.username = "USERNAME_REQUIRED";

  if (!userData.password)
    errors.password = "PASSWORD_REQUIRED";

  if (Object.keys(errors).length > 0) {
    return { error: errors };
  }

  try {
    const result = await userRepo.signInUser(userData);

    if (result.error) {
      return { error: result.error };
    }

    const roleName = await roleRepo.getRoleById(
      result.userInfo.role_id
    );

    const token = jwt.sign(
      {
        id: result.userInfo.id,
        email: result.userInfo.email,
        username: result.userInfo.username,
        fullname: result.userInfo.fullname,
        password: result.userInfo.password,
        phone: result.userInfo.phone,
        role: roleName,
      },
      JWT_SECRET,
      { expiresIn: "4h" }
    );

    return { ...result, token: token };
  } catch (error) {
    return {
      errorCode: "SIGN_IN_FAILED",
      message: error.message,
    };
  }
}

export async function signUpUser(userData) {
  const errors = {};

  if (!userData.username)
    errors.username = "USERNAME_REQUIRED";

  if (!userData.password)
    errors.password = "PASSWORD_REQUIRED";

  if (!userData.fullname)
    errors.fullname = "FULLNAME_REQUIRED";

  if (!userData.email) errors.email = "EMAIL_REQUIRED";

  if (!userData.phone) errors.phone = "PHONE_REQUIRED";

  if (!userData.role_id) errors.role_id = "ROLE_REQUIRED";

  if (Object.keys(errors).length > 0)
    return { error: errors };

  const hashed = await bcrypt.hash(userData.password, 10);

  const submitData = { ...userData, password: hashed };

  try {
    const result = await userRepo.signUpUser(submitData);

    if (result.error) {
      return { error: result.error };
    }

    return { ...result };
  } catch (error) {
    return {
      error: "Sign up failed! Error: " + error.message,
    };
  }
}

export async function getAllUsers() {
  return await userRepo.getAllUsers();
}

export async function getUserById(userId) {
  return await userRepo.getUserById(userId);
}

export async function updateUser(userId, userData) {
  const errors = {};

  if (!userId) {
    errors.userId = "User ID is required!";
  }

  if (!userData.username) {
    errors.username = "USERNAME_REQUIRED";
  }

  if (!userData.password) {
    errors.password = "PASSWORD_REQUIRED";
  }

  if (!userData.fullname) {
    errors.fullname = "FULLNAME_REQUIRED";
  }

  if (!userData.email) {
    errors.email = "EMAIL_REQUIRED";
  }

  if (!userData.phone) {
    errors.phone = "PHONE_REQUIRED";
  }

  if (!userData.role) {
    errors.role = "ROLE_REQUIRED";
  }

  if (Object.keys(errors).length > 0) {
    return { error: errors };
  }

  try {
    const result = await userRepo.updateUser(
      userId,
      userData
    );
    return result;
  } catch (error) {
    return {
      error: "Update user failed! Error: " + error.message,
    };
  }
}

export async function deleteUser(userId) {
  try {
    return await userRepo.deleteUser(userId);
  } catch (error) {
    return {
      error: "Delete user failed! " + error.message,
    };
  }
}
