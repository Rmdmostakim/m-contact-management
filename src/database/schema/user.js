const mongoose = require("mongoose");
const { randomUUID } = require("crypto");
const schema = mongoose.Schema({
  uuid: {
    type: "UUID",
    default: () => randomUUID(),
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = schema;
