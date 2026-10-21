const db = require("../db/db");
const bcrypt = require("bcrypt");

const UserRepository = {
  async signUpUser({
    email,
    username,
    password,
    fullname,
    phone,
  }) {
    try {
      const hashedPw = await bcrypt.hash(password, 10);
      const res = await db.query(
        `INSERT INTO users (email, username, password, fullname, phone) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [email, username, hashedPw, fullname, phone]
      );

      return res.rows[0];
    } catch (err) {
      if (err.code === "23505") {
        if (err.constraint === "users_email_key") {
          return {
            error: "Email already exists!",
          };
        }

        if (err.constraint === "users_username_key") {
          return {
            error: "Username already exists!",
          };
        }

        return {
          error: "Duplicate value!",
        };
      }

      return {
        error: "Error: " + err,
      };
    }
  },

  async signInUser({ username, password }) {
    const res = await db.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (res.rows.length === 0)
      return { error: "User not found!" };

    const user = res.rows[0];

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return { error: "Password incorrect!" };
    }

    delete user.password;

    return user;
  },
};

module.exports = UserRepository;
