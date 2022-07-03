const router = require('express').Router();

router.get('/session', async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
