const router = require('express').Router();

const userRoutes = require('./user-routes');
const destinationRoutes = require('./destination-routes');
const reviewRoutes = require('./review-routes');

router.use('/users', userRoutes);
router.use('/destinations', destinationRoutes);
router.use('/reviews', reviewRoutes);

module.exports = router;