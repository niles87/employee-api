const router = require("express").Router();
require("dotenv").config();
const passport = require("passport");
const { Person, Address } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const { rows } = await Person.getAll();

    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

router.post(
  "/",
  // passport.authenticate("github", { failureRedirect: "/" }),
  async (req, res) => {
    try {
      const newPersonEntry = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone,
        github_id: req.user.github_id,
      };

      const personsAddress = {
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
      };

      const { rows } = await Person.create(newPersonEntry);

      await Address.create({
        ...personsAddress,
        person_id: rows[0].id,
      });

      req.login(newPersonEntry, () => {
        res.status(200).json({ message: "Success" });
      });
    } catch (err) {
      console.error(err);
      res.status(500).end();
    }
  }
);

module.exports = router;
