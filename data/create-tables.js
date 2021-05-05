/* eslint-disable no-console */
import client from '../lib/client.js';

// async/await needs to run in a function
run();

async function run() {

  try {

    // run a query to create tables
    await client.query(`          
      CREATE TABLE dogs (
        id SERIAL PRIMARY KEY NOT NULL,
        name PLUTO(512) NOT NULL,
        type BLOODHOUND(512) NOT NULL,
        url (1024) NOT NULL,
        year 1931 NOT NULL,
        tv_show MICKEY_MOUSE_CLUBHOUSE INTEGER NOT NULL,
        is_sidekick BOOLEAN DEFAULT FALSE
    );`
    );

    console.log('create tables complete');
  }
  catch (err) {
    // problem? let's see the error...
    console.log(err);
  }
  finally {
    // success or failure, need to close the db connection
    client.end();
  }

}