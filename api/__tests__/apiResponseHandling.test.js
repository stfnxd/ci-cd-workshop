const request = require('supertest');
const app = require('../server'); // Stien til din Express-app (API)

describe('API Response Handling', () => {
  it('should return user data for valid user id', async () => {
    const response = await request(app)
      .get('/api/names') // Ændr dette til dit faktiske API-endepunkt for at hente brugerdata
      .expect('Content-Type', /json/) // Forventer JSON-svar
      .expect(200); // Forventer et succesfuldt svar
    expect(response.body.length).toBeGreaterThan(0); // Forventer at få en liste over navne tilbage
    // Du kan tilføje flere forventninger baseret på det forventede svar
  });

  it('should return error for invalid user id', async () => {
    const response = await request(app)
      .get('/api/names/9999') // Ændr dette til et ugyldigt bruger-id eller et ikke-eksisterende endepunkt
      .expect('Content-Type', /json/) // Forventer JSON-svar
      .expect(404); // Forventer et 404-svar for en ikke-eksisterende ressource
    expect(response.body.error).toBe('User not found'); // Forventer en fejlmeddelelse om, at brugeren ikke blev fundet
  });
});