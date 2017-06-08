const router = require('express').Router();

router.use('/users', require('./users')); // matches all requests to /api/users/
router.use('/products', require('./products'));
router.use('/orders', require("./orders"));
router.use('/reviews', require("./reviews"));
router.use('/login', require("./login"));
router.use('/auth', require('./auth'))

router.use(function (req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

module.exports = router;
