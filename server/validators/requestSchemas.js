const Joi = require('joi');

const requestSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  phone: Joi.string().trim().pattern(/^[0-9+\s\-()]+$/).min(7).max(20).required(),
  email: Joi.string().trim().email().required(),
  description: Joi.string().trim().min(10).max(1000).required(),
});

const noteSchema = Joi.object({
  text: Joi.string().trim().min(3).max(1000).required(),
});

module.exports = {
  requestSchema,
  noteSchema,
};
