const router = require('express').Router();
const path = require('path');

router.get('/', async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, '../', 'views', 'SignIn.html'));
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile', async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, '../', 'views', 'DirectoryForm.html'));
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

router.get('/directory', async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, '../', 'views', 'Directory.html'));
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
