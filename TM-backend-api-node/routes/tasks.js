const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId"); // validationg ID of the records you get
const { Task, validate } = require("../models/task");
const { Basket } = require("../models/basket");
const { Project } = require("../models/project");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", [auth], async (req, res) => {
  const tasks = await Task.find().sort("title");
  res.send(tasks);
});

router.post("/", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const basket = await Basket.findById(req.body.basketId);
  if (!basket) return res.status(400).send("Invalid basket.");

  const project = await Project.findById(req.body.projectId);
  if (!project) return res.status(400).send("Invalid project.");

  const task = new Task({
    title: req.body.title,
    deadline: req.body.deadline,
    basket: {
      _id: basket._id,
      name: basket.name,
      project: {
        _id: project._id,
        name: project.name,
        description: project.description,
      },
    },
  });
  await task.save();

  res.send(task);
});

router.put("/:id", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const basket = await Basket.findById(req.body.basketId);
  if (!basket) return res.status(400).send("Invalid Basket.");

  const task = await Task.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      basket: {
        _id: basket._id,
        name: basket.name,
      },

      deadline: req.body.deadline,
    },
    { new: true }
  );

  if (!task)
    return res.status(404).send("The Task with the given ID was not found.");

  res.send(task);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const task = await Task.findByIdAndRemove(req.params.id);

  if (!task)
    return res.status(404).send("The task with the given ID was not found.");

  res.send(task);
});

router.get("/:id", [auth], validateObjectId, async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task)
    return res.status(404).send("The task with the given ID was not found.");

  res.send(task);
});

module.exports = router;
