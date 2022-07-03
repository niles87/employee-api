require('dotenv').config();
const { Person, Address } = require('../models');
const SeedData = require('./seedData.json');

const seeds = async (data) => {
  for (let i = 0; i < data.length; i++) {
    let personalData = {};
    let addressData = {};

    // Personal data
    personalData.first_name = data[i].first_name;
    personalData.last_name = data[i].last_name;
    personalData.phone = data[i].phone;
    personalData.github_id = data[i].github_id;
    
    // Address data 
    addressData.street = data[i].street;
    addressData.city = data[i].city;
    addressData.state = data[i].state;

    const { rows } = await Person.create(personalData);
  
    await Address.create({
      ...addressData,
      person_id: rows[0].id,
    });
  }

  console.log('seeded');
  process.exit(0);
};

seeds(SeedData);
