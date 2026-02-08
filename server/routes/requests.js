const express = require('express');
const router = express.Router();
const controller = require('../controllers/requestsController');

// POST /api/requests  -> crear nueva solicitud
router.post('/', controller.createRequest);

// GET /api/requests   -> obtener todas las solicitudes
router.get('/', controller.getRequests);

module.exports = router;
