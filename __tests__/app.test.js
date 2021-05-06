import app from '../lib/app.js';
import supertest from 'supertest';
import client from '../lib/client.js';
import { execSync } from 'child_process';

const request = supertest(app);

describe('API Routes', () => {

  // beforeAll(() => {
  //   execSync('npm run setup-db');
  // });
  beforeAll(() => {
    execSync('npm run setup-db');
  });

  afterAll(async () => {
    return client.end();
  });

  // const expectedDogs = [
  // let ScoobyDoo = {
  //   id: expect.any(Number),
  //   name: 'Scooby Doo',
  //   type: 'Great Dane',
  //   url: 'scooby-doo.jpeg',
  //   year: 1969,
  //   tvShow: 'Scooby Doo, Where are you?',
  //   isSidekick: true
  // };
  // let pluto = {
  //   id: expect.any(Number),
  //   name: 'Pluto',
  //   type: 'Bloodhound',
  //   url: '',
  //   year: 1931,
  //   tvShow: 'Mickey Mouse Clubhouse',
  //   isSidekick: true
  // };
  // let bolt = {
  //   id: expect.any(Number),
  //   name: 'Bolt',
  //   type: 'German Shepherd',
  //   url: '',
  //   year: 2008,
  //   tvShow: 'Bolt',
  //   isSidekick: false
  // };
  let snoopy = {
    id: expect.any(Number),
    name: 'Snoopy',
    type: 'Beagle',
    url: '',
    year: 1978,
    tvShow: 'Charlie Brown and Snoopy',
    isSidekick: true
  };
  // let odie = {
  //   id: expect.any(Number),
  //   name: 'Odie',
  //   type: 'Dachshund & Terrier Mix',
  //   url: '',
  //   year: 1978,
  //   tvShow: 'The Garfield Show',
  //   isSidekick: true
  // };
  let tramp = {
    id: expect.any(Number),
    name: 'Tramp',
    type: 'Schnauzer mix',
    url: '',
    year: 1914,
    tvShow: 'The Lady and the Tramp',
    isSidekick: false
  };
  let goofy = {
    id: 7,
    name: 'Goofy',
    type: 'Coonhound',
    url: '',
    year: 1939,
    tvShow: 'Goof Troup',
    isSidekick: true
  };

  // let expectedGoofy = {
  //   id: expect.any(Number),
  //   name: 'Goofy',
  //   type: 'Coonhound',
  //   url: '',
  //   year: 1939,
  //   tvShow: 'Goof Troup',
  //   isSidekick: true
  // };
  // let scrappyDoo = {
  //   id: expect.any(Number),
  //   name: 'Scrappy Doo',
  //   type: 'Great Dane',
  //   url: '',
  //   year: 1979,
  //   tvShow: 'Scooby Doo',
  //   isSidekick: true
  // };

  it('POST tramp to /api/dogs', async () => {
    const response = await request
      .post('/api/dogs')
      .send(tramp);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(tramp);

    tramp = response.body;
  });

  it('PUT updated tramp to /api/dogs/:id', async () => {
    tramp.tvShow = 'The Lady and the Tramp';
    tramp.name = 'tramp';

    const response = await request
      .put(`/api/dogs/${tramp.id}`)
      .send(tramp);
      
    expect(response.status).toBe(200);
    expect(response.body).toEqual(tramp);


  });

  it('GET list of dogs from /api/dogs', async () => {
    const r1 = await request.post('/api/dogs').send(snoopy);
    snoopy = r1.body;
    const r2 = await request.post('/api/dogs').send(goofy);
    goofy = r2.body;

    const response = await request.get('/api/dogs');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining([tramp, snoopy, goofy]));
  });

  it('GET snoopy from /api/dogs/:id', async () => {
    const response = await request.get(`/api/dogs/${snoopy.id}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(snoopy);
  });


  it('DELETE goofy from /api/dogs/:id', async () => {
    const response = await request.delete(`/api/dogs/${goofy.id}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(goofy);

    const getResponse = await request.get('/api/dogs');
    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toEqual(expect.arrayContaining([tramp, snoopy]));
  });

  






  // If a GET request is made to /api/cats, does:
  // 1) the server respond with status of 200
  // 2) the body match the expected API data?
  // it.skip('GET /api/dogs', async () => {
  //   // act - make the request
  //   const response = await request.get('/api/dogs');

  //   // was response OK (200)?
  //   expect(response.status).toBe(200);

  //   // did it return the data we expected?
  //   expect(response.body).toEqual(expectedDogs);

  // });

  // it('GET list of dogs from /api/dogs', async () => {
  //   const r1 = await (await request.post('/api/dogs')).send(snoopy);
  //   snoopy = r1.body;
  //   const r2 = await (await request.post('/api/dogs')).send(goofy);
  //   goofy = r2.body;

  //   const response = await request.get('/api/dogs');

  //   expect(response.status).toBe(200);
  //   expect(response.body).toEqual(expect.arrayContaining([tramp, snoopy, goofy]));
  // });



// If a GET request is made to /api/cats/:id, does:
// 1) the server respond with status of 200
// 2) the body match the expected API data for the cat with that id?
// it.skip('GET /api/dogs/:id', async () => {
//   const response = await request.get('/api/dogs/2');
//   expect(response.status).toBe(200);
//   expect(response.body).toEqual(expectedDogs[1]);
// });
});