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
  const projects = await Project.find().sort("date");
  res.send(projects);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const moderators = await User.find({
    email: { $in: req.body.moderater_userEmail },
  });
  if (!moderators) return res.status(400).send("Invalid moderator.");
  console.log("moderators array:", moderators);

  const members = await User.find({
    email: { $in: req.body.member_userEmail },
  });
  if (!members) return res.status(400).send("Invalid member.");
  console.log("members array:", members);

  const project = new Project({
    name: req.body.name,
    description: req.body.description,
    moderators: moderators,
    members: members,
    creater: req.body.createrEmail,
  });
  await project.save();

  res.send(project);
});

router.put("/:id", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // const basket = await Basket.findById(req.body.basketId);
  // if (!basket) return res.status(400).send("Invalid genre.");
  /*
  const User = await User.find({
    _id: { $in: req.body.moderater_userId },
  });
  if (!User) return res.status(400).send("Invalid user.");
  console.log("User array:", User);
  */
  const moderators = await User.find({
    email: { $in: req.body.moderater_userEmail },
  });
  if (!moderators) return res.status(400).send("Invalid moderator.");
  console.log("moderators array:", moderators);

  const members = await User.find({
    email: { $in: req.body.member_userEmail },
  });
  if (!members) return res.status(400).send("Invalid member.");
  console.log("members array:", members);

  const project = await Project.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      moderators: moderators,
      members: members,
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
