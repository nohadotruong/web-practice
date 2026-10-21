import jwt from "jsonwebtoken";

export async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res
      .status(401)
      .json({ message: "Token không được cung cấp!" });

  const token = authHeader.split(" ")[1];

  try {
    const decode = jwt.verify(
      token,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Token không hợp lệ!" });
  }
}
