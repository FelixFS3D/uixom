const mongoose = require('mongoose');
const config = require('../config');
const logger = require('../config/logger');

const connect = async () => {
  try {
    await mongoose.connect(config.mongoURI, {
      autoIndex: true,
      serverSelectionTimeoutMS: 5000,
    });
    logger.info(`Connected to MongoDB: ${mongoose.connection.name}`);
  } catch (err) {
    logger.error(`MongoDB connection error: ${err.message}`);
    process.exit(1);
  }
};

connect();

mongoose.connection.on('disconnected', () => {
  logger.warn('MongoDB connection lost. Attempts to reconnect will continue.');
});

mongoose.connection.on('reconnected', () => {
  logger.info('MongoDB connection re-established.');
});

const gracefulShutdown = async () => {
  await mongoose.connection.close();
  logger.info('MongoDB connection closed.');
  process.exit(0);
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

module.exports = mongoose;