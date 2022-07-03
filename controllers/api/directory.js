const router = require('express').Router();
require('dotenv').config();
const { Person, Address } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const { rows } = await Person.getAll();

    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

router.post('/', async (req, res) => {
  try {
    const newPersonEnrty = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone: req.body.phone,
      github_id: '0123456789'
    };
    
    const personsAddress = {
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
    };

    const { rows } = await Person.create(newPersonEnrty);

    await Address.create({
      ...personsAddress,
      person_id: rows[0].id,
    });

    res.status(200).json({ message: 'Success' });
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});


module.exports = router;
