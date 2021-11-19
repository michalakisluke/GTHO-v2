const path = require('path');
const express = require('express');
const routes = require('./controllers/');
const sequelize = require('./config/connection');
const session = require('express-session');
const exphbs = require('express-handlebars');
//const passport = require('./passport/passport');
require('./passport/passport');
require("dotenv").config();
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const app = express();
const PORT = process.env.PORT || 9001;

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
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set("views", "./views");
//app.use(passport.initialize());
//app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));

//turn on routes
app.use(routes);
app.get('/', (req, res) => {
    res.render('index', {});
});

//turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'))
});