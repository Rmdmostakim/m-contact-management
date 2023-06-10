const { environment } = require("../config");
const serverEnv = environment();
// mongo db connection
const mongoose = require("mongoose");

const database = () => {
  mongoose
    .connect(`mongodb://${serverEnv.db}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("database connected"))
    .catch(() => console.log("failed to connect server"));
};

module.exports = database;
