const middleware = (req, res, next) => {
  const headers = req.headers;
  console.log("app middleware applied");
  next();
};

module.exports = middleware;
