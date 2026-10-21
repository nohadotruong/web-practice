export const errorMessages = {
  en: {
    USERNAME_REQUIRED: "Username is required!",
    USERNAME_NOT_FOUND: "Username not found!",
    PASSWORD_REQUIRED: "Password is required!",
    CONFIRM_REQUIRED: "Password confirm is required!",
    PASSWORD_LENGTH:
      "Password must be 8–15 characters long",
    PASSWORD_MISMATCH: "Passwords do not match!",
    FULLNAME_REQUIRED: "Fullname is required!",
    EMAIL_REQUIRED: "Email is required!",
    INVALID_EMAIL: "Invalid email address!",
    PHONE_REQUIRED: "Phone number is required!",
    INVALID_PHONE: "Invalid phone number format!",
    ROLE_REQUIRED: "Role is required!",
    USER_ID_REQUIRED: "User ID is required!",
    USERNAME_EXISTS: "Username already exists!",
    EMAIL_EXISTS: "Email already exists!",
    PHONE_EXISTS: "Phone number already exists!",
    FETCH_USERS_FAILED: "Fetching users failed!",
    FETCH_USER_FAILED: "Fetching user failed!",
    USER_NOT_FOUND: "User not found!",
    SIGN_UP_FAILED:
      "Sign up failed! Please try again later!",
    SIGN_IN_FAILED:
      "Sign in failed! Please try again later!",
    PASSWORD_INCORRECT: "Password is incorrect!",
    UPDATE_USER_FAILED: "Update user failed!",
    DELETE_USER_FAILED: "Delete user failed!",
    FETCH_USERS_SUCCESS: "Users fetched successfully!",
    FETCH_USER_SUCCESS: "User fetched successfully!",
    SIGN_UP_SUCCESS: "Sign up successfully!",
    SIGN_IN_SUCCESS: "Sign in successfully!",
    UPDATE_USER_SUCCESS: "Update user successfully!",
    DELETE_USER_SUCCESS: "Delete user successfully!",
  },
  vi: {
    USERNAME_REQUIRED: "Tên đăng nhập là bắt buộc!",
    USERNAME_NOT_FOUND: "Tên người dùng không tồn tại!",
    PASSWORD_REQUIRED: "Mật khẩu là bắt buộc!",
    CONFIRM_REQUIRED: "Xác nhận mật khẩu là bắt buộc!",
    PASSWORD_LENGTH: "Mật khẩu phải dài từ 8–15 ký tự",
    PASSWORD_MISMATCH: "Mật khẩu không trùng khớp!",
    FULLNAME_REQUIRED: "Họ và tên là bắt buộc!",
    EMAIL_REQUIRED: "Email là bắt buộc!",
    INVALID_EMAIL: "Địa chỉ email không hợp lệ!",
    PHONE_REQUIRED: "Số điện thoại là bắt buộc!",
    INVALID_PHONE: "Định dạng số điện thoại không hợp lệ!",
    ROLE_REQUIRED: "Vai trò là bắt buộc!",
    USER_ID_REQUIRED: "ID người dùng là bắt buộc!",
    USERNAME_EXISTS: "Tên đăng nhập đã tồn tại!",
    EMAIL_EXISTS: "Email đã tồn tại!",
    PHONE_EXISTS: "Số điện thoại đã tồn tại!",
    FETCH_USERS_FAILED:
      "Lấy danh sách người dùng không thành công!",
    FETCH_USER_FAILED:
      "Lấy thông tin người dùng không thành công!",
    USER_NOT_FOUND: "Người dùng không tồn tại!",
    SIGN_UP_FAILED:
      "Đăng ký không thành công! Vui lòng thử lại sau!",
    SIGN_IN_FAILED:
      "Đăng nhập không thành công! Vui lòng thử lại sau!",
    PASSWORD_INCORRECT: "Mật khẩu không chính xác!",
    UPDATE_USER_FAILED:
      "Cập nhật người dùng không thành công!",
    DELETE_USER_FAILED: "Xóa người dùng không thành công!",
    FETCH_USERS_SUCCESS:
      "Lấy danh sách người dùng thành công!",
    FETCH_USER_SUCCESS:
      "Lấy thông tin người dùng thành công!",
    SIGN_UP_SUCCESS: "Đăng ký thành công!",
    SIGN_IN_SUCCESS: "Đăng nhập thành công!",
    UPDATE_USER_SUCCESS: "Cập nhật người dùng thành công!",
    DELETE_USER_SUCCESS: "Xóa người dùng thành công!",
  },
};

export function formatMessage(lang, code) {
  return errorMessages[lang]?.[code] || code;
}
