import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as UserRepository from "../repositories/userRepository.js";

export async function register(formData) {
  const err = {};

  const emailExists = await UserRepository.findEmail(
    formData.email
  );

  if (emailExists) err.email = "Email đã được sử dụng!";

  const usernameExists = await UserRepository.findUsername(
    formData.username
  );

  if (usernameExists)
    err.username = "Tên đăng nhập đã được sử dụng!";

  const phoneExists = await UserRepository.findPhone(
    formData.phone
  );

  if (phoneExists)
    err.phone = "Số điện thoại đã được sử dụng!";

  if (Object.keys(err).length > 0) {
    return { errors: err };
  }

  const hashed = await bcrypt.hash(formData.password, 10);
  const user = { ...formData, password: hashed };

  try {
    const result = await UserRepository.createUser(user);
    if (result.errors) return { errors: result.errors };

    return {
      message: "Đăng ký thành công! Vui lòng đăng nhập!",
    };
  } catch (error) {
    return { errors: error.message };
  }
}

export async function login(formData) {
  const userData = await UserRepository.findByIdentifier(
    formData.identifier
  );

  if (!userData) {
    return {
      errors: {
        identifier: "Không tìm thấy người dùng!",
      },
    };
  }

  const checkPw = await bcrypt.compare(
    formData.password,
    userData.password
  );

  if (!checkPw) {
    return {
      errors: { password: "Mật khẩu không chính xác!" },
    };
  }

  const token = jwt.sign(
    {
      id: userData.id,
      username: userData.username,
      firstname: userData.firstname,
      role: userData.role_id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "4h" }
  );

  return { role: userData.role_id, token };
}
