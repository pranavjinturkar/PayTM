import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ quiet: true });

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(403).json({
      message: "Bearer Token is required",
      success: false,
    });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(403).json({
      message: "Unauthorized!",
      success: false,
    });
  }
}
