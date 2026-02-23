const Joi = require('joi');

const createUserSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  email: Joi.string().trim().email().required(),
  password: Joi.string().min(6).max(128).required(),
  role: Joi.string().valid('super_admin', 'admin', 'client').default('client'),
});

const updateUserSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100),
  email: Joi.string().trim().email(),
  role: Joi.string().valid('super_admin', 'admin', 'client'),
  isActive: Joi.boolean(),
})
  .min(1)
  .messages({ 'object.min': 'Debes enviar al menos un campo para actualizar.' });

module.exports = {
  createUserSchema,
  updateUserSchema,
};