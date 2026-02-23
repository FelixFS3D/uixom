const formatErrors = (details) =>
  details.map((detail) => ({
    field: detail.path.join('.') || 'value',
    message: detail.message,
  }));

const validateBody = (schema) => (req, res, next) => {
  if (!schema) return next();
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    return res.status(400).json({
      code: 'VALIDATION_ERROR',
      message: 'Errores de validación',
      errors: formatErrors(error.details),
    });
  }

  req.body = value;
  return next();
};

module.exports = validateBody;
