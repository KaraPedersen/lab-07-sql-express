/* eslint-disable no-console */
import client from '../lib/client.js';
// import our seed data:
import dogs from './dogs.js';
import users from './users.js';

run();

async function run() {

  try {

    const data = await Promise.all(
      users.map(user => {
        return client.query(`
          INSERT INTO users (name, email, password_hash)
          VALUES ($1, $2, $3)
          RETURNING *;
        `,
        [user.name, user.email, user.password]);
      })
    );
    
    const user = data[0].rows[0];

    await Promise.all(
      dogs.map(dog => {
        return client.query(`
          INSERT INTO dogs (name, type, url, year, tv_show, is_sidekick, user_id)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
        `,

        // eslint-disable-next-line indent 
        [dog.name, dog.type, dog.url, dog.year, dog.tvShow, dog.isSidekick, user.id]);
      })
    );


    console.log('seed data load complete');
  }
  catch(err) {
    console.log(err);
  } 
  finally {
    client.end();
  }

}