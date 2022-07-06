require("dotenv").config();
const { Person, Address } = require("../models");
const SeedData = require("./seedData.json");
const { hash, encrypt } = require("../utils/crypto");

const seeds = async (data) => {
  for (let i = 0; i < data.length; i++) {
    let personalData = {};
    let addressData = {};

    // Personal data
    personalData.first_name = data[i].first_name;
    personalData.last_name = data[i].last_name;
    personalData.phone = data[i].phone;
    personalData.github_id = hash(data[i].github_id);
    personalData.avatar = data[i].avatar;

    // Address data
    addressData.street = encrypt(data[i].street);
    addressData.city = encrypt(data[i].city);
    addressData.state = encrypt(data[i].state);

    const { rows } = await Person.create(personalData);

    await Address.create({
      ...addressData,
      person_id: rows[0].id,
    });
  }

  console.log("seeded");
  process.exit(0);
};

seeds(SeedData);
