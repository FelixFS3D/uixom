const sendError = (res, status, code, message, extra = {}) => {
  const payload = { code, message, ...extra };
  return res.status(status).json(payload);
};

module.exports = {
  sendError,
};
