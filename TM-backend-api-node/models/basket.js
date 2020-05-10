const Joi = require("joi");
const mongoose = require("mongoose");
const { projectSchema } = require("./project");

const basketSchema = mongoose.Schema({
  project: {
    type: projectSchema,
    required: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 0,
    maxlength: 100,
  },
  date: { type: Date, default: Date.now },
});

const Basket = mongoose.model("Basket", basketSchema);

function validateBasket(basket) {
  const schema = {
    name: Joi.string().min(1).max(100).required(),
    projectId: Joi.objectId().required(),
    date: Joi.date(),
  };

  return Joi.validate(basket, schema);
}

exports.basketSchema = basketSchema;
exports.Basket = Basket;
exports.validate = validateBasket;
