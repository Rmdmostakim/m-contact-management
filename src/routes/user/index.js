const express = require("express");
const user = express.Router();
const appMiddleware = require("../../app/http/middleware/app");
const userMiddleware = require("../../app/http/middleware/user");
const controller = require("../../app/http/controller/user");
// app middleware checking
user.all("*", appMiddleware);
// user routes
user.post("/store", userMiddleware, controller.store);
user.post("/login", appMiddleware, controller.login);
module.exports = user;
