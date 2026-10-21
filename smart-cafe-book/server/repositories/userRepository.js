import db from "../config/db.js";

export async function findEmail(email) {
  const result = await db.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );
  return result.rows[0];
}

export async function findUsername(username) {
  const result = await db.query(
    "SELECT * FROM users WHERE username = $1",
    [username]
  );
  return result.rows[0];
}

export async function findPhone(phone) {
  const result = await db.query(
    "SELECT * FROM users WHERE phone = $1",
    [phone]
  );
  return result.rows[0];
}

export async function findByIdentifier(identifier) {
  const result = await db.query(
    `SELECT * FROM users
     WHERE email = $1 OR username = $1 OR phone = $1
     LIMIT 1`,
    [identifier]
  );

  return result.rows[0];
}

export async function createUser(formData) {
  try {
    const result = await db.query(
      `INSERT INTO users 
       (email, username, firstname, lastname, password, dob, phone, role_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        formData.email,
        formData.username,
        formData.firstname,
        formData.lastname,
        formData.password,
        formData.dob,
        formData.phone,
        formData.role_id,
      ]
    );

    return result.rows[0];
  } catch (error) {
    const err = {};

    if (error.code === "23505") {
      if (error.constraint.includes("email"))
        err.email = "Email đã được sử dụng!";

      if (error.constraint.includes("username"))
        err.username = "Tên đăng nhập đã được sử dụng!";

      if (error.constraint.includes("phone"))
        err.phone = "Số điện thoại đã được sử dụng!";
    }

    if (Object.keys(err).length > 0) {
      return { errors: err };
    }

    return { errors: error.message };
  }
}
