const db = require("../db/db");

const userRepository = {
  async signInUser({ username, password }) {
    const res = await db.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (res.rowCount === 0)
      return { error: "User not found!" };

    const userData = res.rows[0];

    const isMatch = password === userData.password;

    if (!isMatch) return { error: "Password Incorrect!" };

    delete userData.password;

    return { userInfo: userData, userRole: userData.role };
  },

  async signUpUser({ username, fullname, password, role }) {
    try {
      const result = await db.query(
        "INSERT INTO users (username, fullname, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
        [username, fullname, password, role]
      );

      return result.rows[0];
    } catch (err) {
      if (err.code === "23505") {
        return { error: "Users already exists!" };
      }

      return { error: "Error: " + err };
    }
  },

  async getAllUser() {
    const result = await db.query(
      "SELECT * FROM users ORDER BY id ASC"
    );
    return result.rows;
  },

  async getUserById({ id }) {
    const result = await db.query(
      "SELECT * FROM users WHERE id = $1",
      [id]
    );
    return result.rows[0];
  },

  async getUserByRole({ role }) {
    const result = await db.query(
      "SELECT * FROM users WHERE role = $1 ORDER BY id ASC",
      [role]
    );
    return result.rows;
  },

  async updateUserById({
    id,
    username,
    fullname,
    password,
    role,
  }) {
    try {
      const result = await db.query(
        "UPDATE users SET username = $1, fullname = $2, password = $3, role = $4 WHERE id = $5 RETURNING *",
        [username, fullname, password, role, id]
      );
      return result.rows[0];
    } catch (err) {
      return { error: "Error: " + err };
    }
  },

  async deleteUserById({ id }) {
    await db.query("DELETE FROM users WHERE id = $1", [id]);
  },
};

module.exports = userRepository;
