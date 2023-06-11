const middleware = (req, res, next) => {
  console.log("user middleware");
  next();
};

module.exports = middleware;
