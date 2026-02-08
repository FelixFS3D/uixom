const Request = require('../models/Request');
const axios = require('axios');
const config = require('../config');

exports.createRequest = async (req, res) => {
  try {
    const { name, phone, email, description } = req.body;
    if (!name || !phone || !email || !description) {
      return res.status(400).json({ message: 'Todos los campos son requeridos.' });
    }

    const request = new Request({ name, phone, email, description });
    await request.save();

    // Send to n8n webhook if configured (non-blocking)
    if (config.n8nWebhookUrl) {
      axios.post(config.n8nWebhookUrl, { request }).catch(err => {
        console.warn('n8n webhook failed:', err.message);
      });
    }

    return res.status(201).json(request);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getRequests = async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });
    return res.json(requests);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
