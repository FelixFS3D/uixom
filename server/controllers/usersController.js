const User = require('../models/User');
const logger = require('../config/logger');

/**
 * GET /api/users
 * Get all users (admin+)
 */
exports.getUsers = async (req, res) => {
  try {
    const { role, isActive, search, page = 1, limit = 20 } = req.query;

    const filter = {};

    // Filter by role
    if (role && ['super_admin', 'admin', 'client'].includes(role)) {
      filter.role = role;
    }

    // Filter by active status
    if (isActive !== undefined) {
      filter.isActive = isActive === 'true';
    }

    // Search by name or email
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await User.countDocuments(filter);
    const users = await User.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    return res.json({
      users,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error al obtener usuarios.' });
  }
};

/**
 * GET /api/users/:id
 * Get user by ID (admin+)
 */
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ message: 'Error al obtener usuario.' });
  }
};

/**
 * POST /api/users
 * Create user with any role (admin+)
 * super_admin can create admins, admins can create clients
 */
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check permissions: only super_admin can create admin/super_admin
    if (role === 'super_admin' && req.user.role !== 'super_admin') {
      return res.status(403).json({ message: 'Solo super_admin puede crear super_admins.' });
    }
    if (role === 'admin' && req.user.role !== 'super_admin') {
      return res.status(403).json({ message: 'Solo super_admin puede crear admins.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Ya existe un usuario con ese email.' });
    }

    const user = new User({ name, email, password, role: role || 'client' });
    await user.save();

    logger.info(`Usuario creado por ${req.user.email}: ${email} (${role || 'client'})`);

    return res.status(201).json({
      message: 'Usuario creado exitosamente.',
      user,
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error al crear usuario.' });
  }
};

/**
 * PUT /api/users/:id
 * Update user (admin+)
 */
exports.updateUser = async (req, res) => {
  try {
    const { name, email, role, isActive } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    // Prevent editing super_admin unless you are super_admin
    if (user.role === 'super_admin' && req.user.role !== 'super_admin') {
      return res.status(403).json({ message: 'No puedes editar un super_admin.' });
    }

    // Prevent role escalation
    if (role === 'super_admin' && req.user.role !== 'super_admin') {
      return res.status(403).json({ message: 'Solo super_admin puede asignar rol super_admin.' });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;
    if (isActive !== undefined) user.isActive = isActive;

    await user.save();

    logger.info(`Usuario ${user.email} actualizado por ${req.user.email}`);

    return res.json({ message: 'Usuario actualizado.', user });
  } catch (err) {
    return res.status(500).json({ message: 'Error al actualizar usuario.' });
  }
};

/**
 * DELETE /api/users/:id
 * Deactivate user (soft delete) (super_admin only)
 */
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    // Prevent self-deletion
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'No puedes eliminarte a ti mismo.' });
    }

    // Soft delete: deactivate
    user.isActive = false;
    await user.save();

    logger.info(`Usuario ${user.email} desactivado por ${req.user.email}`);

    return res.json({ message: 'Usuario desactivado exitosamente.' });
  } catch (err) {
    return res.status(500).json({ message: 'Error al eliminar usuario.' });
  }
};
