const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { jwt: jwtConfig } = require('../config');
const { sendError } = require('../utils/httpResponses');

/**
 * JWT Authentication middleware
 * Verifies the token and attaches the user to req.user
 */
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return sendError(res, 401, 'AUTH_TOKEN_MISSING', 'Acceso denegado. Token no proporcionado.');
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, jwtConfig.secret);
    const user = await User.findById(decoded.id);

    if (!user) {
      return sendError(res, 401, 'AUTH_USER_NOT_FOUND', 'Token inválido. Usuario no encontrado.');
    }

    if (!user.isActive) {
      return sendError(res, 403, 'AUTH_USER_INACTIVE', 'Cuenta desactivada. Contacta al administrador.');
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return sendError(res, 401, 'AUTH_TOKEN_EXPIRED', 'Token expirado. Inicia sesión nuevamente.');
    }
    if (err.name === 'JsonWebTokenError') {
      return sendError(res, 401, 'AUTH_TOKEN_INVALID', 'Token inválido.');
    }
    return sendError(res, 500, 'AUTH_INTERNAL_ERROR', 'Error de autenticación.');
  }
};

/**
 * Optional authentication - attaches user if token present, continues if not
 */
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(); // No token, continue without user
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, jwtConfig.secret);
    const user = await User.findById(decoded.id);

    if (user && user.isActive) {
      req.user = user;
    }

    next();
  } catch {
    next(); // Invalid token, continue without user
  }
};

module.exports = { authenticate, optionalAuth };
