const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId"); // validationg ID of the records you get
const { Task, validate } = require("../models/task");
const { Basket } = require("../models/basket");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const tasks = await Task.find().sort("title");
  res.send(tasks);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const basket = await Basket.findById(req.body.basketId);
  if (!basket) return res.status(400).send("Invalid genre.");

  const task = new Task({
    title: req.body.title,
    basket: {
      _id: basket._id,
      name: basket.name,
    },

    deadline: req.body.deadline,
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

router.get("/:id", validateObjectId, async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task)
    return res.status(404).send("The task with the given ID was not found.");

  res.send(task);
});

module.exports = router;
