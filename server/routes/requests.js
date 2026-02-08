const express = require('express');
const router = express.Router();
const controller = require('../controllers/requestsController');
const validateRequest = require('../middleware/validateRequest');

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
 *           enum: [new, in_progress, done]
 *           description: Estado de la solicitud
 *           example: new
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
 *     summary: Crea una nueva solicitud
 *     tags: [Requests]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Request'
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
router.post('/', validateRequest, controller.createRequest);

/**
 * @swagger
 * /api/requests:
 *   get:
 *     summary: Obtiene todas las solicitudes
 *     tags: [Requests]
 *     responses:
 *       200:
 *         description: Lista de todas las solicitudes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Request'
 *       500:
 *         description: Error del servidor
 */
router.get('/', controller.getRequests);

module.exports = router;
