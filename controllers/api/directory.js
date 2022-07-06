const router = require("express").Router();
require("dotenv").config();
const { isLoggedIn, hasProfile } = require("../../middlewares/auth");
const { Person, Address } = require("../../models");
const multer = require("multer");
const { upload } = require("../../config/multer");
const { encrypt, decrypt } = require("../../utils/crypto");

router.get("/", isLoggedIn, async (req, res) => {
  try {
    const { rows } = await Person.getAll();
    const decryptedRows = rows.map((person) => {
      return {
        ...person,
        street: decrypt(person.street),
        city: decrypt(person.city),
        state: decrypt(person.state),
      };
    });
    res.status(200).json(decryptedRows);
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

router.post("/", hasProfile, upload, async (req, res) => {
  try {
    const imgName = req.file.path.replace("public", "");

    const newPersonEntry = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone: req.body.phone,
      github_id: req.user.github_id,
      avatar: imgName,
    };

    const personsAddress = {
      street: encrypt(req.body.street),
      city: encrypt(req.body.city),
      state: encrypt(req.body.state),
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
    if (err instanceof multer.MulterError) {
      return res
        .status(413)
        .json({ error: "File too large! Must be under 1MB" });
    } else if (err) {
      return res.status(500).json({ error: err.message });
    }
    console.error(err);
    res.status(500).end();
  }
});

module.exports = router;
