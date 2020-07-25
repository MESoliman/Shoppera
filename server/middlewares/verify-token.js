const jwt = require("jsonwebtoken");
const secret = require("../config/keys").secret;

module.exports = function (req, res, next) {
  let token = req.headers["x-access-token"] || req.headers["authorization"];

  let checkBearer = "Bearer";

  if (token) {
    if (token.startsWith(checkBearer)) {
      token = token.substr(checkBearer.length + 1);
      //token = token.slice(checkBearer.length, token.length);
    }

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.json({ success: false, message: "Failed to authenticate" });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.json({ success: false, message: "Not token provided" });
  }
};
