const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/User');
const Request = require('../models/Request');
const jwt = require('jsonwebtoken');

// Helper to generate a valid JWT for testing
const generateTestToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET || 'uixom_super_secret_key_change_in_production_2026',
    { expiresIn: '1h' }
  );
};

let adminToken;
let adminUser;

beforeAll(async () => {
  // Clean up leftover test users from previous runs
  await User.deleteMany({ email: { $in: ['testadmin@test.com'] } });

  // Create test admin user
  adminUser = await User.create({
    name: 'Test Admin',
    email: 'testadmin@test.com',
    password: 'password123',
    role: 'admin',
  });

  adminToken = generateTestToken(adminUser);
});

afterAll(async () => {
  try {
    await User.deleteMany({ email: { $in: ['testadmin@test.com'] } });
  } catch {
    // Connection may already be closed by testSetup
  }
});

describe('GET /', () => {
  it('should return API welcome message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Uixom API');
  });
});

describe('POST /api/requests', () => {
  it('should create a new request with valid data (public, no auth needed)', async () => {
    const newRequest = {
      name: 'Juan Pérez',
      phone: '+34 123456789',
      email: 'juan@example.com',
      description: 'Necesito una página web para mi negocio de restauración.'
    };

    const res = await request(app)
      .post('/api/requests')
      .send(newRequest);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.name).toBe(newRequest.name);
    expect(res.body.email).toBe(newRequest.email);
  });

  it('should return 400 if name is missing', async () => {
    const invalidRequest = {
      phone: '+34 123456789',
      email: 'juan@example.com',
      description: 'Necesito una página web.'
    };

    const res = await request(app)
      .post('/api/requests')
      .send(invalidRequest);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('errors');
  });

  it('should return 400 if email is invalid', async () => {
    const invalidRequest = {
      name: 'Juan Pérez',
      phone: '+34 123456789',
      email: 'invalid-email',
      description: 'Necesito una página web.'
    };

    const res = await request(app)
      .post('/api/requests')
      .send(invalidRequest);

    expect(res.statusCode).toBe(400);
  });
});

describe('GET /api/requests', () => {
  it('should return 401 without auth token', async () => {
    const res = await request(app).get('/api/requests');
    expect(res.statusCode).toBe(401);
  });

  it('should return requests for authenticated admin', async () => {
    const res = await request(app)
      .get('/api/requests')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('requests');
    expect(res.body).toHaveProperty('pagination');
    expect(Array.isArray(res.body.requests)).toBe(true);
  });
});

describe('GET /api/requests/stats', () => {
  const statsFixtures = [
    {
      name: 'Panel New High',
      phone: '+34 600 111 111',
      email: 'panel-new-high@example.com',
      description: 'Solicitud para probar el panel',
      status: 'new',
      priority: 'high',
    },
    {
      name: 'Panel Progress Medium',
      phone: '+34 600 222 222',
      email: 'panel-progress-medium@example.com',
      description: 'Solicitud en progreso',
      status: 'in_progress',
      priority: 'medium',
    },
    {
      name: 'Panel Done Low',
      phone: '+34 600 333 333',
      email: 'panel-done-low@example.com',
      description: 'Solicitud completada',
      status: 'done',
      priority: 'low',
    },
    {
      name: 'Panel New Urgent',
      phone: '+34 600 444 444',
      email: 'panel-new-urgent@example.com',
      description: 'Segunda solicitud nueva',
      status: 'new',
      priority: 'urgent',
    },
  ];

  beforeAll(async () => {
    await Request.deleteMany({ email: { $in: statsFixtures.map((item) => item.email) } });
    await Request.insertMany(statsFixtures);
  });

  afterAll(async () => {
    await Request.deleteMany({
      email: { $in: statsFixtures.map((item) => item.email) },
    });
  });

  it('should return aggregated totals for admins', async () => {
    const res = await request(app)
      .get('/api/requests/stats')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status');
    expect(res.body).toHaveProperty('priority');
    const expectedStatus = statsFixtures.reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {});
    const expectedPriority = statsFixtures.reduce((acc, item) => {
      acc[item.priority] = (acc[item.priority] || 0) + 1;
      return acc;
    }, {});

    Object.entries(expectedStatus).forEach(([key, count]) => {
      expect(res.body.status[key]).toBeGreaterThanOrEqual(count);
    });
    Object.entries(expectedPriority).forEach(([key, count]) => {
      expect(res.body.priority[key]).toBeGreaterThanOrEqual(count);
    });
    expect(res.body.totals.requests).toBeGreaterThanOrEqual(statsFixtures.length);
    expect(typeof res.body.generatedAt).toBe('string');
  });
});

describe('GET /api/requests sorting', () => {
  const sortFixtures = [
    {
      name: 'Sort Cancelled',
      phone: '+34 610 000 001',
      email: 'sort-cancelled@example.com',
      description: 'Solicitud cancelada para ordenar',
      status: 'cancelled',
      priority: 'medium',
    },
    {
      name: 'Sort Done',
      phone: '+34 610 000 002',
      email: 'sort-done@example.com',
      description: 'Solicitud finalizada para ordenar',
      status: 'done',
      priority: 'low',
    },
    {
      name: 'Sort In Progress',
      phone: '+34 610 000 003',
      email: 'sort-inprogress@example.com',
      description: 'Solicitud en progreso para ordenar',
      status: 'in_progress',
      priority: 'high',
    },
  ];

  beforeAll(async () => {
    await Request.deleteMany({ email: { $in: sortFixtures.map((item) => item.email) } });
    await Request.insertMany(sortFixtures);
  });

  afterAll(async () => {
    await Request.deleteMany({ email: { $in: sortFixtures.map((item) => item.email) } });
  });

  it('should sort by status ascending when requested', async () => {
    const res = await request(app)
      .get('/api/requests?sortBy=status&sortOrder=asc')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    const fixtureEmails = sortFixtures.map((item) => item.email);
    const filteredStatuses = res.body.requests
      .filter((reqItem) => fixtureEmails.includes(reqItem.email))
      .map((reqItem) => reqItem.status);

    // Alphabetical order: cancelled < done < in_progress
    expect(filteredStatuses).toEqual(['cancelled', 'done', 'in_progress']);
    expect(res.body.sort).toEqual({ sortBy: 'status', sortOrder: 'asc' });
  });
});

describe('Auth Endpoints', () => {
  it('POST /api/auth/login - should login with valid admin credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testadmin@test.com',
        password: 'password123',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toBe('testadmin@test.com');
  });

  it('POST /api/auth/login - should reject invalid password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testadmin@test.com',
        password: 'wrongpassword',
      });

    expect(res.statusCode).toBe(401);
  });

  it('GET /api/auth/me - should return current user profile', async () => {
    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe('testadmin@test.com');
    expect(res.body.role).toBe('admin');
  });

  it('GET /api/auth/me - should return 401 without token', async () => {
    const res = await request(app).get('/api/auth/me');
    expect(res.statusCode).toBe(401);
  });
});
