const express = require("express");
const router = express.Router();

const UserController = require("../controller/userController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/signup", async (req, res) => {
  try {
    const result = await UserController.signUpUser(
      req.body
    );

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    return res.status(201).json({
      message: "User created successfully!",
      user: result.user,
    });
  } catch (err) {
    // console.error("Sign up error:", err);
    return res
      .status(500)
      .json({ error: "Internal Server Error!" });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const result = await UserController.signInUser(
      req.body
    );

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    return res.status(200).json({
      message: "Sign in successfully",
      user: result.user,
      token: result.token,
    });
  } catch (err) {
    // console.error("Sign in error: ", err);
    return res
      .status(500)
      .json({ error: "Internal Server Error" });
  }
});

// router.get("/profile", authMiddleware);
// router.get("/users", authMiddleware)

module.exports = router;
