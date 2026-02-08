const request = require('supertest');
const app = require('../app');

describe('GET /', () => {
  it('should return API welcome message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Uixom API');
  });
});

describe('POST /api/requests', () => {
  it('should create a new request with valid data', async () => {
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
  it('should return all requests', async () => {
    const res = await request(app).get('/api/requests');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
