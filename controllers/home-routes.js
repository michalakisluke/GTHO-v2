const router = require('express').Router();
const passport = require("passport");

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

module.exports = router;

// req.user
// req.isAuthenticated() -> true or false
// passport.org/docs