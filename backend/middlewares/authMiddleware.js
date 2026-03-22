import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "ไม่พบ token",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, "mysecretkey");

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Token ไม่ถูกต้อง",
    });
  }
};

export default authMiddleware;