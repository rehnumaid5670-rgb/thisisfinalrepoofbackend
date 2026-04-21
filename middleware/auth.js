// backned/middleware/auth.js
const jwt = require("jsonwebtoken");

// Middleware to verify admin token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  module.exports = async function(req, res, next) {
  // your token verification logic
  next();
};

  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1]; // Bearer <token>

  try {
    const decoded = jwt.verify(token, "library_secret_key"); // same secret as your admin login
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = { verifyToken };