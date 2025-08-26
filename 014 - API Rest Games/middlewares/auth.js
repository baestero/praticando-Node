const jwt = require("jsonwebtoken");
const JWTSecret = "feiewifwepfmdwpfjdsfhjqwadfjpwqo"; //env

function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Token não fornecido", type: "error" });
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ message: "Token inválido", type: "error" });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, JWTSecret);
    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Token inválido ou expirado", type: "error" });
  }
}

module.exports = auth;
