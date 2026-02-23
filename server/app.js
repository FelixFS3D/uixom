const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const config = require('./config');
require('./db');

const app = express();

if (config.trustProxy) {
  app.set('trust proxy', 1);
}

// Security middlewares
app.use(helmet());

const corsOptions = {
  origin: config.cors.origins === '*' ? true : config.cors.origins,
  credentials: config.cors.allowCredentials,
};
app.use(cors(corsOptions));

// Rate limiting: global + stricter login endpoint
const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Demasiadas peticiones desde esta IP, intenta de nuevo más tarde.'
});
app.use('/api/', limiter);

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: 'Demasiados intentos de login. Intenta nuevamente en unos minutos.',
});
app.use('/api/auth/login', loginLimiter);

// Middlewares
app.use(morgan(config.isProduction ? 'combined' : 'dev'));
app.use(express.json({ limit: '1mb' }));

// Swagger Documentation
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Routes
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const requestsRouter = require('./routes/requests');

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/requests', requestsRouter);

// Simple root
app.get('/', (req, res) => res.send('Uixom API'));
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Routes that don't exist / error handler
require('./error-handling')(app);

module.exports = app;
