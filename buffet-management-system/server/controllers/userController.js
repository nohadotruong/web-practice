const userRepository = require("../repositories/userRepository");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const userController = {
  async signInUser({ username, password }) {
    const errors = {};

    if (!username)
      errors.username = "Username is required!";

    if (!password)
      errors.password = "Password is required!";

    if (Object.keys(errors).length > 0) {
      return { error: errors };
    }

    const result = await userRepository.signInUser({
      username,
      password,
    });

    if (result.error) {
      if (result.error.includes("User"))
        return { error: { username: result.error } };

      if (result.error.includes("Password"))
        return { error: { password: result.error } };

      return {
        error: {
          backend: "Backend error: " + result.error,
        },
      };
    }

    const token = jwt.sign(
      {
        id: result.userInfo.id,
        username: result.userInfo.username,
        role: result.userInfo.role,
      },
      JWT_SECRET,
      { expiresIn: "4h" }
    );

    return {
      userData: result.userInfo,
      userRole: result.userRole,
      token,
    };
  },

  async signUpUser({ username, fullname, password, role }) {
    const errors = {};

    if (!username)
      errors.username = "Username is required!";
    if (!fullname)
      errors.fullname = "Fullname is required!";
    if (!password)
      errors.password = "Password is required!";
    if (!role) errors.role = "Role is required!";
    if (Object.keys(errors).length > 0) {
      return { error: errors };
    }

    const result = await userRepository.signUpUser({
      username,
      fullname,
      password,
      role,
    });

    if (result.error) {
      if (result.error.includes("Users")) {
        return {
          error: { username: result.error },
        };
      }

      return {
        error: {
          backend: "Backend error: " + result.error,
        },
      };
    }

    return result;
  },

  async getAllUser() {
    const result = await userRepository.getAllUser();
    return result;
  },

  async getUserById({ id }) {
    const errors = {};

    if (!id) errors.id = "User id is required!";
    if (Object.keys(errors).length > 0) {
      return { error: errors };
    }

    const result = await userRepository.getUserById({
      id,
    });
    return result;
  },

  async getUserByRole({ role }) {
    const errors = {};

    if (!role) errors.role = "Role is required!";
    if (Object.keys(errors).length > 0) {
      return { error: errors };
    }

    const result = await userRepository.getUserByRole({
      role,
    });
    return result;
  },

  async updateUserById({
    id,
    username,
    fullname,
    password,
    role,
  }) {
    const errors = {};

    if (!username)
      errors.username = "Username is required!";
    if (!fullname)
      errors.username = "Fullname is required!";
    if (!password)
      errors.password = "Password is required!";
    if (!role) errors.role = "Role is required!";
    if (Object.keys(errors).length > 0) {
      return { error: errors };
    }

    const result = await userRepository.updateUserById({
      id,
      username,
      fullname,
      password,
      role,
    });

    if (result.error) {
      return {
        error: {
          backend: "Backend error: " + result.error,
        },
      };
    }
    return result;
  },

  async deleteUserById({ id }) {
    const errors = {};

    if (!id) errors.id = "User id is required!";
    if (Object.keys(errors).length > 0) {
      return { error: errors };
    }

    const existing = await userRepository.getUserById({
      id,
    });
    if (!existing) {
      return { error: { id: "User not found!" } };
    }

    await userRepository.deleteUserById({ id });

    return { message: "User deleted successfully!" };
  },
};

module.exports = userController;
