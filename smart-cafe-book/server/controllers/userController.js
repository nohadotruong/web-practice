import * as UserService from "../services/userService.js";

export async function register(req, res) {
  try {
    const result = await UserService.register(req.body);

    if (result.errors) {
      return res.status(400).json({
        status: 0,
        message: "Đăng ký không thành công!",
        errors: result.errors,
      });
    }

    return res.status(201).json({
      status: 1,
      message: result.message,
    });
  } catch (error) {
    return res.status(500).json({
      status: 0,
      message: "Đăng ký không thành công!",
      errors: error.message,
    });
  }
}

export async function login(req, res) {
  try {
    const result = await UserService.login(req.body);

    if (result.errors)
      return res.status(400).json({
        status: 0,
        message: "Đăng nhập không thành công!",
        errors: result.errors,
      });

    return res.status(200).json({
      status: 1,
      message: "Đăng nhập thành công!",
      token: result.token,
      role: result.role,
    });
  } catch (error) {
    return res.status(500).json({
      status: 0,
      message: "Đăng nhập không thành công!",
      errors: error.message,
    });
  }
}
