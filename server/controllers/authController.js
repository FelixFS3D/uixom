const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../config/logger');
const { jwt: jwtConfig } = require('../config');

/**
 * Generate JWT token
 */
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn,
  });
};

// No public registration - users are created by admins only via /api/users

/**
 * POST /api/auth/login
 * Login user
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user with password field
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: 'Cuenta desactivada. Contacta al administrador.' });
    }

    // Only admin and super_admin can login
    if (!['admin', 'super_admin'].includes(user.role)) {
      return res.status(403).json({ message: 'Acceso restringido a administradores.' });
    }

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(user);

    logger.info(`Usuario logueado: ${email}`);

    return res.json({
      message: 'Login exitoso.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    logger.error(`Error en login: ${err.message}`);
    return res.status(500).json({ message: 'Error al iniciar sesión.' });
  }
};

/**
 * GET /api/auth/me
 * Get current user profile (protected)
 */
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    return res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      lastLogin: user.lastLogin,
      createdAt: user.createdAt,
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error al obtener perfil.' });
  }
};

/**
 * PUT /api/auth/me
 * Update current user profile (protected)
 */
exports.updateMe = async (req, res) => {
  try {
    const { name, email, currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id).select('+password');

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    // Update name/email
    if (name) user.name = name;
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'Ese email ya está en uso.' });
      }
      user.email = email;
    }

    // Update password if provided
    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({ message: 'Se requiere la contraseña actual para cambiarla.' });
      }
      const isMatch = await user.comparePassword(currentPassword);
      if (!isMatch) {
        return res.status(401).json({ message: 'Contraseña actual incorrecta.' });
      }
      user.password = newPassword;
    }

    await user.save();

    logger.info(`Perfil actualizado: ${user.email}`);

    return res.json({
      message: 'Perfil actualizado exitosamente.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error al actualizar perfil.' });
  }
};
