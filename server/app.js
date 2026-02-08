require('dotenv').config();
require('./db');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Routes
const requestsRouter = require('./routes/requests');
app.use('/api/requests', requestsRouter);

// Simple root
app.get('/', (req, res) => res.send('Uixom API'));

// Routes that don't exist / error handler
require('./error-handling')(app);

module.exports = app;
