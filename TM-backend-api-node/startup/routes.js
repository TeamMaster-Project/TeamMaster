const express = require("express");
const baskets = require("../routes/baskets");
const projects = require("../routes/projects");
const tasks = require("../routes/tasks");
const users = require("../routes/users");
const auth = require("../routes/auth");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());

  app.use("/api/baskets", baskets);
  app.use("/api/projects", projects);
  app.use("/api/tasks", tasks);

  app.use("/api/users", users);
  app.use("/api/auth", auth);

  app.use(error);
};
