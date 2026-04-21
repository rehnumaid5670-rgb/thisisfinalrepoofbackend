const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) return res.status(403).send("Access denied");

  try {
    jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).send("Invalid token");
  }
};