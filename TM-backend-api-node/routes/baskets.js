const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
const { Basket, validate } = require("../models/basket");
const { Project } = require("../models/project");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", [auth], async (req, res) => {
  const baskets = await Basket.find().sort("date");
  res.send(baskets);
});

router.post("/", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const project = await Project.findById(req.body.projectId);
  if (!project) return res.status(400).send("Invalid project.");

  let basket = new Basket({
    name: req.body.name,
    project: {
      _id: project._id,
      name: project.name,
      description: project.description,
    },
  });
  basket = await basket.save();

  res.send(basket);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const basket = await Basket.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
    }
  );

  if (!basket)
    return res.status(404).send("The basket with the given ID was not found.");

  res.send(basket);
});

router.delete("/:id", [auth, validateObjectId], async (req, res) => {
  const basket = await Basket.findByIdAndRemove(req.params.id);

  if (!basket)
    return res.status(404).send("The basket with the given ID was not found.");

  res.send(basket);
});

router.get("/:id", [auth], validateObjectId, async (req, res) => {
  const basket = await Basket.findById(req.params.id);

  if (!basket)
    return res.status(404).send("The basket with the given ID was not found.");

  res.send(basket);
});

module.exports = router;
