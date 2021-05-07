import app from '../lib/app.js';
import supertest from 'supertest';
import client from '../lib/client.js';
import { execSync } from 'child_process';

const request = supertest(app);

describe('API Routes', () => {

  afterAll(async () => {
    return client.end();
  });

  describe('/api/dogs', () => {

    let user;

    beforeAll(async () => {
      execSync('npm run recreate-tables');

      const response = await request
        .post('/api/auth/signup')
        .send({
          name: 'Me the User',
          email: 'me@user.com',
          password: 'password'
        });

      expect(response.status).toBe(200);

      user = response.body;
    }); 

    let snoopy = {
      id: expect.any(Number),
      name: 'Snoopy',
      type: 'Beagle',
      url: '',
      year: 1978,
      tvShow: 'Charlie Brown and Snoopy',
      isSidekick: true
    };

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


    it('POST snoopy to /api/dogs', async () => {  
      snoopy.userId = user.id;
      const response = await request
        .post('/api/dogs')
        .send(snoopy);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(snoopy);

      snoopy = response.body;
    });

    it('PUT updated snoopy to /api/dogs/:id', async () => {
      snoopy.tvShow = 'Charlie Brown and Snoopy';
      snoopy.name = 'snoopy';

      const response = await request
        .put(`/api/dogs/${snoopy.id}`)
        .send(snoopy);
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual(snoopy);


    });

    it('GET list of dogs from /api/dogs', async () => {
      tramp.userId = user.id;
      const r1 = await request.post('/api/dogs').send(tramp);
      tramp = r1.body;

      goofy.userId = user.id;
      const r2 = await request.post('/api/dogs').send(goofy);
      goofy = r2.body;

      const response = await request.get('/api/dogs');

      expect(response.status).toBe(200);

      const expected = [tramp, snoopy, goofy].map(dog => {
        return {
          userName: user.name,
          ...dog
        };
      });

      expect(response.body).toEqual(expect.arrayContaining(expected));
    });

    it.skip('GET snoopy from /api/dogs/:id', async () => {
      const response = await request.get(`/api/dogs/${snoopy.id}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(snoopy);
    });


    it.skip('DELETE goofy from /api/dogs/:id', async () => {
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

  //   expect(response.status).toBe(200);  //   expect(response.body).toEqual(expect.arrayContaining([tramp, snoopy, goofy]));
  });
});