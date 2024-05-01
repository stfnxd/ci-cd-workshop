const { fetchData } = require('../app');

test('fetchData function returns correct data', () => {
  // Simulerer en asynkron funktion, der henter data
  return fetchData().then(data => {
    expect(data).toEqual(['John', 'Doe', 'Jane']);
  });
});

test('fetchData function handles errors gracefully', () => {
  // Simulerer en asynkron funktion, der kaster en fejl
  return fetchData().catch(error => {
    expect(error).toMatch('Error');
  });
});