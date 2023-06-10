const express = require("express");
const user = express.Router();
const appMiddleware = require("../../middleware/app");
const userMiddleware = require("../../middleware/user");
const controller = require("../../controller/user");
// app middleware checking
user.all("*", appMiddleware);
// user routes

user.get("/", (req, res) => {
  res.send("user home page");
});

user.post("/store", userMiddleware, controller.store);

user.post("/login", userMiddleware, (req, res) => {
  res.send("login");
});
/*routes group
user
  .route("/")
  .get((req, res) => {
    res.send("user get method");
  })
  .post(userMiddleware, (req, res) => {
    res.send("user post method");
  });
*/
module.exports = user;
