const db = require("../config/connection");
require("dotenv").config();

class Person {
  constructor() {
    this.encryptionKey = process.env.ENCRYPTION_KEY;
  }
  getAll() {
    return db.query(
      ` SELECT 
        people.id,
        pgp_sym_decrypt(first_name::bytea, $1) as first_name,
        pgp_sym_decrypt(last_name::bytea, $1) as last_name,
        pgp_sym_decrypt(phone::bytea, $1) as phone,
        pgp_sym_decrypt(avatar::bytea, $1) as avatar,
        github_id,
        addresses.*
        FROM people INNER JOIN addresses ON people.id = addresses.person_id ORDER BY last_name DESC`,
      [this.encryptionKey]
    );
  }

  findUser({ github_id }) {
    return db.query(
      `SELECT 
        github_id, 
        pgp_sym_decrypt(first_name::bytea, $1) as first_name,
        pgp_sym_decrypt(last_name::bytea, $1) as last_name
        FROM people WHERE github_id = $2`,
      [this.encryptionKey, github_id]
    );
  }
  create({ first_name, last_name, phone, github_id, avatar }) {
    return db.query(
      `INSERT INTO 
        people(first_name, last_name, phone, github_id, avatar) 
        VALUES (
          PGP_SYM_ENCRYPT($1, $6),
          PGP_SYM_ENCRYPT($2, $6), 
          PGP_SYM_ENCRYPT($3, $6),
          PGP_SYM_ENCRYPT($4, $6),
          PGP_SYM_ENCRYPT($5, $6)
        )
        RETURNING *`,
      [first_name, last_name, phone, github_id, avatar, this.encryptionKey]
    );
  }
}

module.exports = new Person();
