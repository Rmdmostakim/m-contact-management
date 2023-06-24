const mongoose = require("mongoose");
const schema = require("../../../database/schema/token");

const token = new mongoose.model("AccessToken", schema);

module.exports = token;
