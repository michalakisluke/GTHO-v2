const passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models');

passport.serializeUser((user, done) => {
    done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
    User.findByPk(id)
    .then(function(user) {
        done(null, user.get({plain: true}));
    })
    .catch(function(err) {
        console.log(err)
        done(err, null);
    });
});
  
passport.use('local',new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async function(username, password, done) {
    try {
        const user = await User.findOne({
            where: {
                email: username
            }
        });
    
        if (!user) {
            return done(null, false, {message: 'Incorrect Credentials.'});
        }
    
        if (!user.checkPassword(password)) {
            return done(null, false, {message: 'Incorrect Credentials.'});
        }

        return done(null, user.get({plain: true}));  
    } catch(err) {
        console.log(err);
        done(err, null);
    }
}));