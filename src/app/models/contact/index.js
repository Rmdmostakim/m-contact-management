const mongoose = require("mongoose");
const Schema = require("../../../database/schema/contact");

const contact = new mongoose.model("Contact", Schema);
module.exports = contact;
