//server env
const { environment } = require("../config");
const serverEnv = environment();
// database config
const database = require("../database");
//express server
const express = require("express");
const app = express();
app.use(express.json());
const server = () => {
  // server start
  app.listen(serverEnv.port, () => {
    console.log(`server starting on port: ${serverEnv.port}`);
  });
};
// database connection
database();
//routes
const routes = require("../routes");
app.use("/user", routes.user);
app.use("/contact", routes.contact);

module.exports = server;
