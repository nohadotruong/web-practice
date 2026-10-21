import express from "express";
import * as UserController from "../controllers/userController.js";

const router = express.Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);

// router.get(
//   "/profile",
//   authMiddleware,
//   roleMiddleware(["Customer", "Admin"]),
//   UserController.profile
// );

export default router;
