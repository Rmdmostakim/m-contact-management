const express = require("express");
const contact = express.Router();
const appMiddleware = require("../../app/http/middleware/app");
const userMiddleware = require("../../app/http/middleware/user");
const controller = require("../../app/http/controller/contact");
// app middleware checking
contact.all("*", appMiddleware);
// store single contact
contact.post("/store", userMiddleware, controller.store);
// update single contact
contact.put("/update", userMiddleware, controller.update);
// delete single contact
contact.delete("/delete/:uuid", userMiddleware, controller.delete);
// get all contacts
contact.get("/all", userMiddleware, controller.all);
module.exports = contact;
