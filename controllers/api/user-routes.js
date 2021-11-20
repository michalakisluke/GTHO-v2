const router = require('express').Router();
const passport = require('passport');
const User = require('../../models/User');
const Destination = require('../../models/Destination');
const Review = require('../../models/Review');

//Get all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Create New User
router.post('/', (req, res) => {
    User.create({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    })
    .then(dbUserData => {
        req.session.save(() => {
            req.session.user_id = dbUserData.id,
            req.session.username = dbUserData.username,
            req.isAuthenticated = true;

            res.json(dbUserData);
        });
    });
});

// Login user
router.post('/login', (req, res, next) => {
    //expects { email: 'YYY@gmail.com', password: 'password1234' }
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }

        if (!user) {
            return res.json({ status: 'error', message: info.message });
        }

        req.login(user, function(err) {
            if (err) { return next(err); }
            res.status(200).json({ status: 'ok' });
        });
    })(req, res, next);
});

// Log Out
router.post('/logout', (req, res, next) => {
    req.logout();
    req.session.destroy(err => {
        if (err) return next(err);
        return res.send({authenticated: req.isAuthenticated()});
    });
});
module.exports = router;