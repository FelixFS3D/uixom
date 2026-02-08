require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5005,
  mongoURI: process.env.MONGODB_URI || 'mongodb://localhost:27017/uixom',
  n8nWebhookUrl: process.env.N8N_WEBHOOK_URL || null,
};
