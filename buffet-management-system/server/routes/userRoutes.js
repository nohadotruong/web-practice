const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const allowRoles = require("../middlewares/roleMiddleware");
const userController = require("../controllers/userController");

router.post("/signin", async (req, res) => {
  try {
    const result = await userController.signInUser(
      req.body
    );

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    return res.status(200).json({
      message: "Sign in successfully!",
      userInfo: result.userData,
      userRole: result.userRole,
      token: result.token,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Internal Server Error!" });
  }
});

router.post(
  "/signup",
  authMiddleware,
  allowRoles("Manager"),
  async (req, res) => {
    try {
      const result = await userController.signUpUser(
        req.body
      );

      if (result.error) {
        return res
          .status(400)
          .json({ error: result.error });
      }

      return res.status(201).json({
        message: "Sign up user successfully!",
        user: result,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Internal Server Error!" });
    }
  }
);

router.get(
  "/",
  authMiddleware,
  allowRoles("Manager"),
  async (req, res) => {
    try {
      const result = await userController.getAllUser();
      return res.status(200).json({
        message: "Get users successfully!",
        users: result,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Internal Server Error!" });
    }
  }
);

router.get(
  "/by-id/:id",
  authMiddleware,
  allowRoles("Manager"),
  async (req, res) => {
    const userId = req.params.id;
    try {
      const result = await userController.getUserById({
        id: userId,
      });
      return res.status(200).json({
        message: "Get user successfully!",
        user: result,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Internal Server Error!" });
    }
  }
);

router.get(
  "/by-role/:role",
  authMiddleware,
  allowRoles("Manager"),
  async (req, res) => {
    const role = req.params.role;
    try {
      const result = await userController.getUserByRole({
        role: role,
      });
      return res.status(200).json({
        message: "Get users successfully!",
        users: result,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Internal Server Error!" });
    }
  }
);

router.put(
  "/:id",
  authMiddleware,
  allowRoles("Manager"),
  async (req, res) => {
    const userId = req.params.id;
    try {
      const result = await userController.updateUserById({
        id: userId,
        ...req.body,
      });

      if (result.error) {
        return res.status(400).json({
          message: "Update user failed!",
          error: result.error,
        });
      }

      return res.status(200).json({
        message: "Update user successfully!",
        user: result,
      });
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Internal Server Error!" });
    }
  }
);

router.delete(
  "/:id",
  authMiddleware,
  allowRoles("Manager"),
  async (req, res) => {
    const userId = req.params.id;
    try {
      const result = await userController.deleteUserById({
        id: userId,
      });

      if (result.error) {
        return res.status(400).json({
          message: "Delete user failed!",
          error: result.error,
        });
      }

      return res.status(200).json({
        message: "Delete user successfully!",
      });
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Internal Server Error!" });
    }
  }
);

module.exports = router;
