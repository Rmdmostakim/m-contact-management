const express = require("express");
const contact = express.Router();
const appMiddleware = require("../../middleware/app");
const userMiddleware = require("../../middleware/user");
// app middleware checking
contact.all("*", appMiddleware);
// get all user contacts
contact.get("/:user", (req, res) => {
  res.send("user all contact");
});
// get specific user contact
contact.get("/:user/:contactId", (req, res) => {
  res.send("user specific contact");
});
// store single contact
contact.post("/store", userMiddleware, (req, res) => {
  res.send("store contact");
});
// update single contact
contact.put("/update/:contactId", userMiddleware, (req, res) => {
  res.send("update contact");
});
// delete single contact
contact.delete("/delete/:contactId", userMiddleware, (req, res) => {
  res.send("delete contact");
});

module.exports = contact;
