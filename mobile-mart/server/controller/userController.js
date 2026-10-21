const UserRepository = require("../repositories/UserRepository");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const userController = {
  async signUpUser({
    email,
    username,
    password,
    confirmPw,
    fullname,
    phone,
  }) {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) errors.email = "Email cannot be empty!";
    else if (!emailRegex.test(email))
      errors.email = "Email is invalid!";

    if (!username)
      errors.username = "Username cannot be empty!";

    if (!fullname)
      errors.fullname = "Fullname cannot be empty!";

    if (!phone) errors.phone = "Phone cannot be empty!";

    if (!password)
      errors.password = "Password cannot be empty!";

    if (!confirmPw)
      errors.confirmPw =
        "Confirm password cannot be empty!";

    if (password && confirmPw && password !== confirmPw)
      errors.confirmPw = "Passwords do not match!";

    if (Object.keys(errors).length > 0) {
      return { error: errors };
    }

    const res = await UserRepository.signUpUser({
      email,
      username,
      password,
      fullname,
      phone,
    });

    if (res.error) {
      if (res.error.includes("Email")) {
        return { error: { email: res.error } };
      }

      if (res.error.includes("Username")) {
        return { error: { username: res.error } };
      }

      return { error: { backend: res.error } };
    }

    return res;
  },

  async signInUser({ username, password }) {
    const errors = {};

    if (!username)
      errors.username = "Username cannot be empty!";

    if (!password)
      errors.password = "Password cannot be empty!";

    if (Object.keys(errors).length > 0) {
      return { error: errors };
    }

    const res = await UserRepository.signInUser({
      username,
      password,
    });

    if (res.error) {
      if (res.error.includes("User")) {
        return { error: { username: res.error } };
      }

      if (res.error.includes("Password")) {
        return { error: { password: res.error } };
      }

      return { error: { backend: res.error } };
    }

    const token = jwt.sign(
      { id: res.id, username: res.username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return { user: res, token };
  },
};

module.exports = userController;
