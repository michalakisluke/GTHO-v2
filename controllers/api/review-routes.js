const router = require('express').Router();
const User = require('../../models/User');
const Destination = require('../../models/Destination');
const Review = require('../../models/Review');

// post review
router.post('/', (req, res) => {
    Review.create({
        rating: req.body.rating,
        user: req.session.user_id,
        destination_id: req.body.destination_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
})

//get reviews
router.get('/:id', (req, res) => {
    Review.findAll({
        where: {
            destination_id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No destination found with this id'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

module.exports = router;