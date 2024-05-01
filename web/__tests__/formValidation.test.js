const request = require('supertest');
const app = require('../app'); // Stien til din Express-app

describe('Form Validation', () => {
  it('should reject incomplete form data', async () => {
    const response = await request(app)
      .post('/add-name') // Ændr dette til dit faktiske formularindsendelsesendepunkt
      .send({ name: '' }); // Sendt ufuldstændige data med vilje
    expect(response.status).toBe(400); // Forventer et Bad Request-svar
    expect(response.body.error).toBe('Missing name'); // Forventer en fejlmeddelelse om manglende navn
  });

  it('should accept complete form data', async () => {
    const response = await request(app)
      .post('/add-name') // Ændr dette til dit faktiske formularindsendelsesendepunkt
      .send({ name: 'testname' }); // Sendt komplette data
    expect(response.status).toBe(200); // Forventer et succesfuldt svar
    expect(response.text).toBe('Name added'); // Forventer en bekræftelse på, at navnet blev tilføjet
  });
});
