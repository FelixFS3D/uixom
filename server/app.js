require('dotenv').config();
require('./db');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// Security middlewares
app.use(helmet());

// Rate limiting: max 100 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Demasiadas peticiones desde esta IP, intenta de nuevo más tarde.'
});
app.use('/api/', limiter);

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Swagger Documentation
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Routes
const requestsRouter = require('./routes/requests');
app.use('/api/requests', requestsRouter);

// Simple root
app.get('/', (req, res) => res.send('Uixom API'));

// Routes that don't exist / error handler
require('./error-handling')(app);

module.exports = app;
