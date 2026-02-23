const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { authenticate } = require('../middleware/auth');
const { authorize } = require('../middleware/roles');
const validateBody = require('../middleware/validateBody');
const { createUserSchema, updateUserSchema } = require('../validators/userSchemas');

// ─── All routes require admin+ ─────────────────────────────

router.use(authenticate, authorize('admin', 'super_admin'));

// ─── Swagger ────────────────────────────────────────────────

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestión de usuarios (solo admin+)
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Listar todos los usuarios
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum: [super_admin, admin, client]
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Buscar por nombre o email
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *     responses:
 *       200:
 *         description: Lista paginada de usuarios
 *       401:
 *         description: No autenticado
 *       403:
 *         description: Sin permisos
 */
router.get('/', usersController.getUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtener usuario por ID
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Datos del usuario
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/:id', usersController.getUserById);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crear usuario con rol específico
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               role:
 *                 type: string
 *                 enum: [super_admin, admin, client]
 *                 default: client
 *     responses:
 *       201:
 *         description: Usuario creado
 *       403:
 *         description: Sin permisos para ese rol
 *       409:
 *         description: Email ya existe
 */
router.post('/', validateBody(createUserSchema), usersController.createUser);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Actualizar usuario
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [super_admin, admin, client]
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       403:
 *         description: Sin permisos
 *       404:
 *         description: No encontrado
 */
router.put('/:id', validateBody(updateUserSchema), usersController.updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Desactivar usuario (soft delete)
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario desactivado
 *       400:
 *         description: No puedes eliminarte a ti mismo
 *       404:
 *         description: No encontrado
 */
router.delete('/:id', authorize('super_admin'), usersController.deleteUser);

module.exports = router;
