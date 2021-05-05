/* eslint-disable no-console */
import client from '../lib/client.js';
// import our seed data:
import dogs from './dogs.js';

run();

async function run() {

  try {

    await Promise.all(
      dogs.map(dog => {
        return client.query(`
          INSERT INTO dogs (name, type, url, year, tv_show, is_sidekick)
          VALUES ($1, $2, $3, $4, $5, $6);
        `,

          // eslint-disable-next-line indent
          [dog.name, dog.type, dog.url, dog.year, dog.tvShow, dog.isSidekick]);
      })
    );


    console.log('seed data load complete');
  }
  catch (err) {
    console.log(err);
  }
  finally {
    client.end();
  }

}