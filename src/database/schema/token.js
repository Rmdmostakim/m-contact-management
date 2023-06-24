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
  token: {
    type: String,
    require: true,
  },
  expired: {
    type: Date,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = schema;
