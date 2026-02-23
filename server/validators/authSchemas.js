const Joi = require('joi');

const messages = {
  'string.base': 'El campo {#label} debe ser un texto.',
  'string.empty': 'El campo {#label} es requerido.',
  'any.required': 'El campo {#label} es requerido.',
};

const registerSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required().label('nombre'),
  email: Joi.string().trim().email().required().label('email'),
  password: Joi.string().min(6).max(128).required().label('contraseña'),
}).messages(messages);

const loginSchema = Joi.object({
  email: Joi.string().trim().email().required().label('email'),
  password: Joi.string().required().label('contraseña'),
}).messages(messages);

const updateProfileSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100),
  email: Joi.string().trim().email(),
  currentPassword: Joi.string(),
  newPassword: Joi.string().min(6).max(128),
})
  .min(1)
  .messages({
    ...messages,
    'object.min': 'Debes enviar al menos un campo para actualizar.',
  });

module.exports = {
  registerSchema,
  loginSchema,
  updateProfileSchema,
};
