const jwt = require("jsonwebtoken");
const config = require("config");
const { notAuthorized } = require("../utilites/httpError");

module.exports = (req, res, next) => {
  // Get Token from Header
  const token = req.header("x-auth-token");

  // Check if no Token
  if (!token) res.status(401).json({ msg: "No Token Authorization denied" });

  // Verify Token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user;

    next();
  } catch (err) {
    console.error(err);
    notAuthorized(res, "Token Invalid");
  }
};
