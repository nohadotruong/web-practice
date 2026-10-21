import db from "../config/db.js";
import bcrypt from "bcrypt";

export async function signInUser(userData) {
  const errors = {};

  try {
    const result = await db.query(
      "SELECT * FROM users WHERE username = $1",
      [userData.username]
    );

    if (result.rowCount === 0) {
      errors.username = "USERNAME_NOT_FOUND";
    } else {
      const isMatch = await bcrypt.compare(
        userData.password,
        result.rows[0].password
      );

      if (!isMatch) errors.password = "PASSWORD_INCORRECT";
    }

    if (Object.keys(errors).length > 0) {
      return { error: errors };
    }

    return {
      message: "SIGN_IN_SUCCESS",
      userInfo: result.rows[0],
    };
  } catch (error) {
    return {
      errorCode: "SIGN_IN_FAILED",
      message: error.message,
    };
  }
}

export async function signUpUser(userData) {
  const errors = {};

  const checkEmail = await db.query(
    "SELECT id FROM users WHERE email = $1",
    [userData.email]
  );
  if (checkEmail.rowCount > 0)
    errors.email = "EMAIL_EXISTS";

  const checkUsername = await db.query(
    "SELECT id FROM users WHERE username = $1",
    [userData.username]
  );
  if (checkUsername.rowCount > 0)
    errors.username = "USERNAME_EXISTS";

  const checkPhone = await db.query(
    "SELECT id FROM users WHERE phone = $1",
    [userData.phone]
  );
  if (checkPhone.rowCount > 0)
    errors.phone = "PHONE_EXISTS";

  if (Object.keys(errors).length > 0) {
    return { error: errors };
  }

  try {
    await db.query(
      "INSERT INTO users (email, username, fullname, password, phone, role_id) VALUES ($1, $2, $3, $4, $5, $6)",
      [
        userData.email,
        userData.username,
        userData.fullname,
        userData.password,
        userData.phone,
        userData.role_id,
      ]
    );

    return { message: "SIGN_UP_SUCCESS" };
  } catch (error) {
    if (error.code === "23505") {
      if (error.constraint === "users_email_key") {
        errors.email = "EMAIL_EXISTS";
      }

      if (error.constraint === "users_username_key") {
        errors.username = "USERNAME_EXISTS";
      }

      if (error.constraint === "users_phone_key") {
        errors.phone = "PHONE_EXISTS";
      }

      if (Object.keys(errors).length > 0) {
        return { error: errors };
      }
    }

    return {
      errorCode: "SIGN_IN_FAILED",
      message: error.message,
    };
  }
}

export async function getAllUsers() {
  const result = await db.query("SELECT * FROM users");
  return { userList: result.rows };
}

export async function getUserById(userId) {
  try {
    const result = await db.query(
      "SELECT * FROM users WHERE id = $1",
      [userId]
    );

    return { userInfo: result.rows[0] };
  } catch (error) {
    return {
      error: "Fetch user failed! Error: " + error.message,
    };
  }
}

export async function updateUserById(userId, userData) {
  const errors = {};

  const usernameCheck = await db.query(
    "SELECT id FROM users WHERE username = $1 AND id <> $2",
    [userData.username, userId]
  );
  if (usernameCheck.rowCount > 0)
    errors.username = "USERNAME_EXISTS";

  const emailCheck = await db.query(
    "SELECT id FROM users WHERE email = $1 AND id <> $2",
    [userData.email, userId]
  );
  if (emailCheck.rowCount > 0)
    errors.email = "EMAIL_EXISTS";

  const phoneCheck = await db.query(
    "SELECT id FROM users WHERE phone = $1 AND id <> $2",
    [userData.phone, userId]
  );
  if (phoneCheck.rowCount > 0)
    errors.phone = "PHONE_EXISTS";

  if (Object.keys(errors).length > 0)
    return { error: errors };

  try {
    const result = await db.query(
      `UPDATE users 
       SET username = $1, email = $2, phone = $3, fullname = $4, role_id = $5
       WHERE id = $6 RETURNING *`,
      [
        userData.username,
        userData.email,
        userData.phone,
        userData.fullname,
        userData.role,
        userId,
      ]
    );

    return { userInfo: result };
  } catch (error) {
    if (error.code === "23505") {
      if (error.constraint === "users_email_key") {
        errors.email = "EMAIL_EXISTS";
      }

      if (error.constraint === "users_username_key") {
        errors.username = "USERNAME_EXISTS";
      }

      if (error.constraint === "users_phone_key") {
        errors.phone = "PHONE_EXISTS";
      }

      if (Object.keys(errors).length > 0) {
        return { error: errors };
      }
    }

    return {
      errorCode: "UPDATE_USER_FAILED",
      message: error.message,
    };
  }
}

export async function deleteUserById(userId) {
  try {
    const result = await db.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [userId]
    );

    if (result.rowCount === 0) {
      return { errors: "USERNAME_NOT_FOUND" };
    }

    return { userInfo: result.rows[0] };
  } catch (error) {
    return {
      errorCode: "DELETE_USER_FAILED",
      message: error.message,
    };
  }
}
