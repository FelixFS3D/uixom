const express = require('express');
const router = express.Router();
const controller = require('../controllers/requestsController');
const { authenticate } = require('../middleware/auth');
const { authorize } = require('../middleware/roles');
const validateBody = require('../middleware/validateBody');
const { requestSchema, noteSchema } = require('../validators/requestSchemas');

/**
 * @swagger
 * components:
 *   schemas:
 *     Request:
 *       type: object
 *       required:
 *         - name
 *         - phone
 *         - email
 *         - description
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre completo del solicitante
 *           example: Juan Pérez
 *         phone:
 *           type: string
 *           description: Número de teléfono
 *           example: +34 123456789
 *         email:
 *           type: string
 *           format: email
 *           description: Correo electrónico
 *           example: juan@example.com
 *         description:
 *           type: string
 *           description: Descripción detallada de la solicitud
 *           example: Necesito una página web para mi negocio
 *         status:
 *           type: string
 *           enum: [new, in_progress, done, cancelled]
 *           description: Estado de la solicitud
 *           example: new
 *         priority:
 *           type: string
 *           enum: [low, medium, high, urgent]
 *           example: medium
 *         createdBy:
 *           type: string
 *           description: ID del usuario que creó la solicitud
 *         assignedTo:
 *           type: string
 *           description: ID del usuario asignado
 *         notes:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *               author:
 *                 type: string
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/requests:
 *   post:
 *     summary: Crea una nueva solicitud (público)
 *     description: No requiere autenticación. Si el usuario está autenticado, se vincula automáticamente.
 *     tags: [Requests]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, phone, email, description]
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Solicitud creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Request'
 *       400:
 *         description: Datos de entrada inválidos
 *       500:
 *         description: Error del servidor
 */
router.post('/', validateBody(requestSchema), controller.createRequest);

/**
 * @swagger
 * /api/requests:
 *   get:
 *     summary: Obtiene todas las solicitudes (admin+)
 *     description: Solo admin y super_admin pueden ver las solicitudes.
 *     tags: [Requests]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [new, in_progress, done, cancelled]
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *           enum: [low, medium, high, urgent]
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
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
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [createdAt, updatedAt, status, priority]
 *           default: createdAt
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *     responses:
 *       200:
 *         description: Lista paginada de solicitudes
 *       401:
 *         description: No autenticado
 */
router.get('/', authenticate, authorize('admin', 'super_admin'), controller.getRequests);

/**
 * @swagger
 * /api/requests/stats:
 *   get:
 *     summary: Obtener totales agregados por estado y prioridad (admin+)
 *     description: Devuelve métricas rápidas para el panel interno.
 *     tags: [Requests]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Totales agregados
 *       401:
 *         description: No autenticado
 *       403:
 *         description: Sin acceso
 */
router.get('/stats', authenticate, authorize('admin', 'super_admin'), controller.getRequestStats);

/**
 * @swagger
 * /api/requests/{id}:
 *   get:
 *     summary: Obtener solicitud por ID
 *     tags: [Requests]
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
 *         description: Datos de la solicitud
 *       403:
 *         description: Sin acceso
 *       404:
 *         description: No encontrada
 */
router.get('/:id', authenticate, authorize('admin', 'super_admin'), controller.getRequestById);

/**
 * @swagger
 * /api/requests/{id}:
 *   patch:
 *     summary: Actualizar solicitud (admin+)
 *     tags: [Requests]
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
 *               status:
 *                 type: string
 *                 enum: [new, in_progress, done, cancelled]
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high, urgent]
 *               assignedTo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Solicitud actualizada
 *       404:
 *         description: No encontrada
 */
router.patch('/:id', authenticate, authorize('admin', 'super_admin'), controller.updateRequest);

/**
 * @swagger
 * /api/requests/{id}/notes:
 *   post:
 *     summary: Añadir nota a solicitud (admin+)
 *     tags: [Requests]
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
 *             required: [text]
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       201:
 *         description: Nota añadida
 *       404:
 *         description: Solicitud no encontrada
 */
router.post(
	'/:id/notes',
	authenticate,
	authorize('admin', 'super_admin'),
	validateBody(noteSchema),
	controller.addNote,
);

/**
 * @swagger
 * /api/requests/{id}:
 *   delete:
 *     summary: Eliminar solicitud (super_admin)
 *     tags: [Requests]
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
 *         description: Solicitud eliminada
 *       404:
 *         description: No encontrada
 */
router.delete('/:id', authenticate, authorize('super_admin'), controller.deleteRequest);

module.exports = router;
