const Request = require('../models/Request');
const logger = require('../config/logger');
const emailService = require('../services/emailService');

const STATUS_KEYS = ['new', 'in_progress', 'done', 'cancelled'];
const PRIORITY_KEYS = ['low', 'medium', 'high', 'urgent'];
const SORT_FIELDS = {
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  status: 'status',
  priority: 'priority',
};

const mapCounts = (keys, dataset) => keys.reduce((acc, key) => {
  const bucket = dataset.find((item) => item._id === key);
  acc[key] = bucket ? bucket.count : 0;
  return acc;
}, {});

/**
 * POST /api/requests (public)
 * Create a new service request
 */
exports.createRequest = async (req, res) => {
  try {
    const { name, phone, email, description } = req.body;
    if (!name || !phone || !email || !description) {
      return res.status(400).json({ message: 'Todos los campos son requeridos.' });
    }

    const request = new Request({ name, phone, email, description });
    await request.save();

    // Send internal + client email notifications (non-blocking)
    emailService
      .sendNewRequestNotifications(request)
      .catch((err) => logger.warn(`Email notification failed: ${err.message}`));

    return res.status(201).json(request);
  } catch (err) {
    logger.error(`Error creating request: ${err.message}`);
    return res.status(500).json({ message: err.message });
  }
};

/**
 * GET /api/requests (protected: admin+ only)
 */
exports.getRequests = async (req, res) => {
  try {
    const {
      status,
      priority,
      search,
      page = 1,
      limit = 20,
      sortBy,
      sortOrder,
    } = req.query;
    const filter = {};

    // Optional filters
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const parsedPage = parseInt(page, 10) || 1;
    const parsedLimit = parseInt(limit, 10) || 20;
    const skip = (parsedPage - 1) * parsedLimit;

    const sortField = SORT_FIELDS[sortBy] || 'createdAt';
    const sortDirection = sortOrder === 'asc' ? 1 : -1;
    const sortOptions = { [sortField]: sortDirection };
    if (sortField !== 'createdAt') {
      sortOptions.createdAt = -1; // Stable ordering for tie-breaker
    }

    const total = await Request.countDocuments(filter);
    const requests = await Request.find(filter)
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email')
      .populate('notes.author', 'name email')
      .sort(sortOptions)
      .skip(skip)
      .limit(parsedLimit);

    return res.json({
      requests,
      pagination: {
        total,
        page: parsedPage,
        limit: parsedLimit,
        pages: Math.ceil(total / parsedLimit),
      },
      sort: {
        sortBy: sortField,
        sortOrder: sortDirection === 1 ? 'asc' : 'desc',
      },
    });
  } catch (err) {
    logger.error(`Error fetching requests: ${err.message}`);
    return res.status(500).json({ message: err.message });
  }
};

/**
 * GET /api/requests/stats (protected: admin+)
 * Aggregated totals for the internal panel
 */
exports.getRequestStats = async (req, res) => {
  try {
    const [statusAgg, priorityAgg] = await Promise.all([
      Request.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
      Request.aggregate([{ $group: { _id: '$priority', count: { $sum: 1 } } }]),
    ]);

    const status = mapCounts(STATUS_KEYS, statusAgg);
    const priority = mapCounts(PRIORITY_KEYS, priorityAgg);
    const totalRequests = STATUS_KEYS.reduce((sum, key) => sum + status[key], 0);

    return res.json({
      totals: {
        requests: totalRequests,
      },
      status,
      priority,
      generatedAt: new Date().toISOString(),
    });
  } catch (err) {
    logger.error(`Error fetching request stats: ${err.message}`);
    return res.status(500).json({ message: 'No se pudieron obtener las estadísticas.' });
  }
};

/**
 * GET /api/requests/:id (protected)
 */
exports.getRequestById = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email')
      .populate('notes.author', 'name email');

    if (!request) {
      return res.status(404).json({ message: 'Solicitud no encontrada.' });
    }

    return res.json(request);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/**
 * PATCH /api/requests/:id (protected: admin+ can update status/priority/assignedTo)
 */
exports.updateRequest = async (req, res) => {
  try {
    const { status, priority, assignedTo } = req.body;
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: 'Solicitud no encontrada.' });
    }

    if (status) request.status = status;
    if (priority) request.priority = priority;
    if (assignedTo !== undefined) request.assignedTo = assignedTo;

    await request.save();

    const populated = await Request.findById(request._id)
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email')
      .populate('notes.author', 'name email');

    logger.info(`Request ${request._id} updated by ${req.user.email}`);

    return res.json(populated);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/**
 * POST /api/requests/:id/notes (protected: admin+)
 */
exports.addNote = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ message: 'El texto de la nota es requerido.' });
    }

    const request = await Request.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Solicitud no encontrada.' });
    }

    request.notes.push({ text: text.trim(), author: req.user._id });
    await request.save();

    const populated = await Request.findById(request._id)
      .populate('notes.author', 'name email');

    return res.status(201).json(populated.notes);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/**
 * DELETE /api/requests/:id (protected: super_admin only)
 */
exports.deleteRequest = async (req, res) => {
  try {
    const request = await Request.findByIdAndDelete(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Solicitud no encontrada.' });
    }

    logger.info(`Request ${req.params.id} deleted by ${req.user.email}`);
    return res.json({ message: 'Solicitud eliminada exitosamente.' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
