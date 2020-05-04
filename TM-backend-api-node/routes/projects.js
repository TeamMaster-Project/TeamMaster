const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId"); // validationg ID of the records you get
const { Project, validate } = require("../models/project");
const { User } = require("../models/user");
const { Basket } = require("../models/basket");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const projects = await Project.find().sort("name");
  res.send(projects);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const baskets = await Basket.find({ _id: { $in: req.body.basketId } });
  if (!baskets) return res.status(400).send("Invalid basket.");
  //console.log("baskets array:", baskets);

  const moderators = await User.find({
    _id: { $in: req.body.moderater_userId },
  });
  if (!moderators) return res.status(400).send("Invalid user.");
  console.log("moderators array:", moderators);

  const members = await User.find({
    _id: { $in: req.body.member_userId },
  });
  if (!members) return res.status(400).send("Invalid user.");
  // console.log("members array:", members);

  const project = new Project({
    name: req.body.name,
    description: req.body.description,
    baskets: baskets,
    moderators: moderators,
    members: members,
  });
  await project.save();

  res.send(project);
});

router.put("/:id", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const basket = await Basket.findById(req.body.basketId);
  if (!basket) return res.status(400).send("Invalid genre.");

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send("Invalid user.");

  const project = await Project.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      basket: {
        _id: basket._id,
        name: basket.name,
      },
      moderators: {
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
      },
      members: {
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
      },
    },
    { new: true }
  );

  if (!project)
    return res.status(404).send("The project with the given ID was not found.");

  res.send(project);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const project = await Project.findByIdAndRemove(req.params.id);

  if (!project)
    return res.status(404).send("The project with the given ID was not found.");

  res.send(project);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project)
    return res.status(404).send("The project with the given ID was not found.");

  res.send(project);
});

module.exports = router;
