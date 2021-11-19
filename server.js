const path = require('path');
const express = require('express');
const routes = require('./controllers/');
const sequelize = require('./config/connection');
const session = require('express-session');
const exphbs = require('express-handlebars');
const passport = require('passport');
require('./passport/passport');
require("dotenv").config();

const SequelizeStore = require('connect-session-sequelize')(session.Store)

const app = express();
const PORT = process.env.PORT || 3001;


const hbs = exphbs.create()

const sess = {
    secret: process.env.SESSIONS_PW,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));

app.use(passport.initialize());
app.use(passport.session());
app.engine('handlebars', exphbs.engine);
app.set('view engine', 'handlebars');

//turn on routes
app.get('/', (req, res) => {
    res.send('Eureka!');
})

//turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'))
});