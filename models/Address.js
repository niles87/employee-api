const db = require('../config/connection');

class Address {
  create({ street, city, state, person_id }) {
    return db.query(
      `INSERT INTO addresses(street, city, state, person_id)
      VALUES ($1, $2, $3, $4)`,
      [street, city, state, person_id]
    );
  }

}

module.exports = new Address();
