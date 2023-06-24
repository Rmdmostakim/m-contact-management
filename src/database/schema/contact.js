const mongoose = require("mongoose");
const { randomUUID } = require("crypto");
const User = require("../../app/models/user");
const schema = mongoose.Schema({
  uuid: {
    type: "UUID",
    default: () => randomUUID(),
  },
  user_uuid: {
    type: "UUID",
    require: true,
    ref: "User",
    validate: [
      {
        validator: async function (user_uuid) {
          // Check user uuid is exists or not
          const user = await User.findOne({ uuid: user_uuid });
          return user ? true : false;
        },
        message: "invalid user uuid",
      },
    ],
  },
  first_name: {
    type: String,
    require: true,
    validate: [
      {
        validator: async function (first_name) {
          return first_name.length >= 1;
        },
        message: "first name should be at least 1 characters long",
      },
    ],
  },
  last_name: {
    type: String,
    require: false,
    validate: [
      {
        validator: async function (last_name) {
          return last_name.length >= 1;
        },
        message: "last name should be at least 1 characters long",
      },
    ],
  },
  phone: {
    type: String,
    require: true,
    validate: [
      {
        validator: async function (phone) {
          return phone.length >= 1;
        },
        message: "phone number should be at least 1 characters long",
      },
    ],
  },
});

// Convert UUID buffer to string before returning the document
schema.set("toObject", { getters: true });
schema.set("toJSON", { getters: true });
schema.path("uuid").get(function (uuid) {
  return uuid.toString("hex");
});
schema.path("user_uuid").get(function (user_uuid) {
  return user_uuid.toString("hex");
});

module.exports = schema;
