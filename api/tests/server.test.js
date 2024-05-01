const request = require('supertest');
const app = require('../server');

beforeAll(async () => {
    // Start din server før alle testene
    await new Promise(resolve => {
      app.listen(3001, resolve);
    });
  });
  
  test('POST /api/names endpoint adds a new name', async () => {
    const response = await request(app)
      .post('/api/names')
      .send({ name: 'Alice' });
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({ message: 'Name added' });
  });
  
  test('GET /api/names endpoint returns all names', async () => {
    const response = await request(app).get('/api/names');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining(['John', 'Doe', 'Jane']));
  });