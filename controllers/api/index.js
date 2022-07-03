const router = require('express').Router();
const dirRoutes = require('./directory');

router.use('/directory', dirRoutes);

module.exports = router;
