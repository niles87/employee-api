require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool();

module.exports = {
  query: (text, params) => {
    return pool.query(text, params);
  },
  getClient: () => {
    return pool.connect();
  }
};
