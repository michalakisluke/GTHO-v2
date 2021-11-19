const path = require('path');
const express = require('express');
const routes = require('./controllers/');
console.log("here")
const sequelize = require('./config/connection');
console.log("here2")
const session = require('express-session');
const exphbs = require('express-handlebars');
const passport = require('./passport/passport');
// require('./passport/passport');
require("dotenv").config();
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const app = express();
const PORT = process.env.PORT || 9001;
// sequelize.sync().then(() => {
//     console.log("HERE")
// })
const hbs = exphbs.create()
const sess = {
    secret: 'secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};
console.log("here3")
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set("views", "./views")
    // app.use(passport.initialize());
    // app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));
console.log("here4")
    //turn on routes
app.get('/', (req, res) => {
        res.render('index', {});
    })
    //turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    console.log("here5")
    app.listen(PORT, () => console.log('Now listening'))
});