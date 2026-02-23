const { sendError } = require('../utils/httpResponses');

/**
 * Role-based access control middleware
 * Must be used AFTER authenticate middleware
 *
 * Usage: authorize('admin', 'super_admin')
 */
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return sendError(res, 401, 'ROLE_NOT_AUTHENTICATED', 'Acceso denegado. No autenticado.');
    }

    if (!allowedRoles.includes(req.user.role)) {
      return sendError(
        res,
        403,
        'ROLE_FORBIDDEN',
        `Acceso denegado. Se requiere rol: ${allowedRoles.join(' o ')}.`,
      );
    }

    return next();
  };
};

module.exports = { authorize };
