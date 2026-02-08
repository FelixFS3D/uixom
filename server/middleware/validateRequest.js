const Joi = require('joi');

const requestSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  phone: Joi.string().pattern(/^[0-9+\s\-()]+$/).min(7).max(20).required(),
  email: Joi.string().email().required(),
  description: Joi.string().min(10).max(1000).required()
});

const validateRequest = (req, res, next) => {
  const { error } = requestSchema.validate(req.body, { abortEarly: false });
  
  if (error) {
    const errors = error.details.map(detail => ({
      field: detail.path[0],
      message: detail.message
    }));
    return res.status(400).json({ 
      message: 'Errores de validación',
      errors 
    });
  }
  
  next();
};

module.exports = validateRequest;
