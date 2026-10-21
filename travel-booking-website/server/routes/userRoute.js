import express from "express";
import * as userCtrl from "../controllers/userController.js";
const router = express.Router();

router.post("/signin", async (req, res) => {
  try {
    const result = await userCtrl.signInUser(req.body);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    return res.status(200).json({
      message: "SIGN_IN_SUCCESS",
      userInfo: result.userInfo,
      token: result.token,
    });
  } catch (error) {
    return res.status(500).json({
      errorCode: "SIGN_IN_FAILED",
      message: error.message,
    });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const result = await userCtrl.signUpUser(req.body);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    return res.status(201).json({
      message: "SIGN_UP_SUCCESS",
      userInfo: result.userInfo,
      token: result.token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "SIGN_UP_FAILED",
      error: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const { userList } = await userCtrl.getAllUsers();

    return res.status(200).json({
      message: "Fetch users successfully!",
      userList,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Fetch users failed!",
      error: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const { userInfo } = await userCtrl.getUserById(userId);

    if (!userInfo) {
      return res
        .status(404)
        .json({ error: "User not found" });
    }

    return res.status(200).json({
      message: "Fetch user successfully!",
      userInfo,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Fetch user failed!",
      error: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await userCtrl.updateUser(
      userId,
      req.body
    );

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    if (!result.userInfo) {
      return res
        .status(404)
        .json({ error: "User not found" });
    }

    return res.status(200).json({
      message: "Update user successfully!",
      userInfo: result.userInfo,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Update user failed!",
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await userCtrl.deleteUser(userId);

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
});

export default router;

// import express from "express";
// import * as userCtrl from "../controllers/userController.js";

// const router = express.Router();

// router.get("/", async (req, res) => {
//   try {
//     const result = await userCtrl.getAllUsers();

//     if (result.errorCode) {
//       return res.status(500).json({
//         errorCode: result.errorCode,
//         message: result.message,
//       });
//     }

//     return res.status(200).json({
//       message: "FETCH_USERS_SUCCESS",
//       userList: result.userList,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       errorCode: "FETCH_USERS_FAILED",
//       message: error.message,
//     });
//   }
// });

// router.get("/:id", async (req, res) => {
//   const userId = req.params.id;
//   try {
//     const result = await userCtrl.getUserById(userId);

//     if (result.errorCode === "USER_NOT_FOUND") {
//       return res.status(404).json({
//         errorCode: result.errorCode,
//         message: "USER_NOT_FOUND",
//       });
//     }

//     if (result.errorCode) {
//       return res.status(500).json({
//         errorCode: result.errorCode,
//         message: result.message,
//       });
//     }

//     return res.status(200).json({
//       message: "FETCH_USER_SUCCESS",
//       userInfo: result.userInfo,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       errorCode: "FETCH_USER_FAILED",
//       message: error.message,
//     });
//   }
// });

// router.post("/signup", async (req, res) => {
//   try {
//     const result = await userCtrl.signUp(req.body);

//     if (result.error) {
//       return res.status(400).json({ error: result.error });
//     }

//     return res.status(201).json({
//       message: "SIGN_UP_SUCCESS",
//       userInfo: result.userInfo,
//       token: result.token,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       errorCode: "SIGN_UP_FAILED",
//       message: error.message,
//     });
//   }
// });

// router.post("/signin", async (req, res) => {
//   try {
//     const result = await userCtrl.signIn(req.body);

//     if (result.error) {
//       return res.status(400).json({ error: result.error });
//     }

//     return res.status(200).json({
//       message: "SIGN_IN_SUCCESS",
//       userInfo: result.userInfo,
//       token: result.token,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       errorCode: "SIGN_IN_FAILED",
//       message: error.message,
//     });
//   }
// });

// router.put("/:id", async (req, res) => {
//   const userId = req.params.id;

//   try {
//     const result = await userCtrl.updateUser(
//       userId,
//       req.body
//     );

//     if (result.error) {
//       const status =
//         result.errorCode === "USER_NOT_FOUND" ? 404 : 400;
//       return res
//         .status(status)
//         .json({ error: result.error || result.errorCode });
//     }

//     return res.status(200).json({
//       message: "UPDATE_USER_SUCCESS",
//       userInfo: result.userInfo,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       errorCode: "UPDATE_USER_FAILED",
//       message: error.message,
//     });
//   }
// });

// router.delete("/:id", async (req, res) => {
//   const userId = req.params.id;
//   try {
//     const result = await userCtrl.deleteUser(userId);

//     if (result.error) {
//       const status =
//         result.errorCode === "USER_NOT_FOUND" ? 404 : 400;
//       return res.status(status).json({
//         errorCode: result.errorCode,
//         message: result.message || result.error,
//       });
//     }

//     return res
//       .status(200)
//       .json({ message: "DELETE_USER_SUCCESS" });
//   } catch (error) {
//     return res.status(500).json({
//       errorCode: "DELETE_USER_FAILED",
//       message: error.message,
//     });
//   }
// });

// export default router;
