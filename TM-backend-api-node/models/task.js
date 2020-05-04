const Joi = require("joi");
const mongoose = require("mongoose");
const { basketSchema } = require("./basket");

const Task = mongoose.model(
  "Tasks",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 255,
    },
    basket: {
      type: basketSchema,
      required: true,
    },

    date: { type: Date, default: Date.now },

    deadline: {
      type: Date,
      //required: true,
    },
  })
);

function validateTask(task) {
  const schema = {
    title: Joi.string().min(1).max(50).required(),
    basketId: Joi.objectId().required(),
    date: Joi.date(),
    deadline: Joi.date(),
  };

  return Joi.validate(task, schema);
}

exports.Task = Task;
exports.validate = validateTask;
