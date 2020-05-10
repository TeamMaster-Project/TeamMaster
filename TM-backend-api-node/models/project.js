const Joi = require("joi");
const mongoose = require("mongoose");
const { basketSchema } = require("./basket");
const { userSchema } = require("./user");

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  description: {
    type: String,
    required: true,
    minlength: 0,
    maxlength: 255,
  },

  creater: {
    type: String,
  },

  moderators: {
    //members who can add tasks and delete tasks userSchema
    type: [userSchema], //userSchema type array
    required: true,
  },

  members: {
    //members who complete tasks
    type: [userSchema], //userSchema type array
    required: true,
  },
  date: { type: Date, default: Date.now },
});

const Project = mongoose.model("Project", projectSchema);

function validateProject(project) {
  const schema = {
    name: Joi.string().min(1).max(50).required(),
    description: Joi.string().min(0).max(255).required(),
    //basketId: Joi.array().required(),
    moderater_userEmail: Joi.array(),
    date: Joi.date(),
    member_userEmail: Joi.array(),
    createrEmail: Joi.string(),
  };

  return Joi.validate(project, schema);
}

exports.Project = Project;
exports.validate = validateProject;
exports.projectSchema = projectSchema;
