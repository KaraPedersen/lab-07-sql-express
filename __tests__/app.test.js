import app from '../lib/app.js';
import supertest from 'supertest';
import client from '../lib/client.js';
import { execSync } from 'child_process';

const request = supertest(app);

describe('API Routes', () => {

  beforeAll(() => {
    execSync('npm run setup-db');
  });

  afterAll(async () => {
    return client.end();
  });

  const expectedDogs = [
    {
      id: expect.any(Number),
      name: 'Scooby Doo',
      type: 'Great Dane',
      url: '',
      year: 1969,
      tvShow: 'Scooby Doo, Where are you?',
      isSidekick: true
    },
    {
      id: expect.any(Number),
      name: 'Pluto',
      type: 'Bloodhound',
      url: '',
      year: 1931,
      tvShow: 'Mickey Mouse Clubhouse',
      isSidekick: true
    },
    {
      id: expect.any(Number),
      name: 'Bolt',
      type: 'German Shepherd',
      url: '',
      year: 2008,
      tvShow: 'Bolt',
      isSidekick: false
    },
    {
      id: expect.any(Number),
      name: 'Snoopy',
      type: 'Beagle',
      url: '',
      year: 1978,
      tvShow: 'Charlie Brown and Snoopy',
      isSidekick: true
    },
    {
      id: expect.any(Number),
      name: 'Odie',
      type: 'Dachshund & Terrier Mix',
      url: '',
      year: 1978,
      tvShow: 'The Garfield Show',
      isSidekick: true
    },
    {
      id: expect.any(Number),
      name: 'Tramp',
      typ: 'Schnauzer mix',
      url: '',
      year: 1914,
      tvShow: 'The Lady and the Tramp',
      isSidekick: false
    },
    {
      id: expect.any(Number),
      name: 'Goofy',
      type: 'Coonhound',
      url: '',
      year: 1939,
      tvShow: 'Goof Troup',
      isSidekick: true
    },
    {
      id: expect.any(Number),
      name: 'Scrappy Doo',
      type: 'Great Dane',
      url: '',
      year: 1979,
      tvShow: 'Scooby Doo',
      isSidekick: true
    }
  ];

  // If a GET request is made to /api/cats, does:
  // 1) the server respond with status of 200
  // 2) the body match the expected API data?
  it('GET /api/dogs', async () => {
    // act - make the request
    const response = await request.get('/api/dogs');

    // was response OK (200)?
    expect(response.status).toBe(200);

    // did it return the data we expected?
    expect(response.body).toEqual(expectedDogs);

  });

  // If a GET request is made to /api/cats/:id, does:
  // 1) the server respond with status of 200
  // 2) the body match the expected API data for the cat with that id?
  test('GET /api/dogs/:id', async () => {
    const response = await request.get('/api/dogs/2');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedDogs[1]);
  });
});