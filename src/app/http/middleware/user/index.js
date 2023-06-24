const { decode } = require("../../../helpers");
const Token = require("../../../models/token");
const middleware = async (req, res, next) => {
  // Get the authorization header
  const authorizationHeader = req.headers["authorization"];
  // Check if the header exists and starts with 'Bearer '
  if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
    // Extract the token value
    const token = authorizationHeader.slice(7);
    const decodeToken = decode(token);
    if (decodeToken) {
      const exists = await Token.findOne({ token });
      if (exists) {
        next();
      } else {
        res.status(401).send("Invalid authorization header");
      }
    } else {
      res.status(401).send("Invalid authorization header");
    }
  } else {
    res.status(401).send("Invalid authorization header");
  }
};

module.exports = middleware;
