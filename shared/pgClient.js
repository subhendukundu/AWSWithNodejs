import pg from 'pg';

import { Config } from '../configs';

/**
  * @description A function that returns pg client connection
  * @returns {client} - pg connection.
  * @example const client = pgClient();
*/
exports.pgClient = () => {
  const { conString } = Config;
  const client = new pg.Client(conString);
  client.connect((err) => {
    if (err) {
      console.error('connection error', err.stack); // eslint-disable-line
    } else {
      console.log('connected'); // eslint-disable-line
    }
  });

  return client;
};
