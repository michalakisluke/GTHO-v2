const path = require('path');
const express = require('express');
const routes = require('./controllers/');
const sequelize = require('./config/connection');
const session = require('express-session');
const passport = require('passport-local');
require("dotenv").config();

const SequelizeStore = require('connect-session-sequelize')(session.Store)

const app = express();
const PORT = process.env.PORT || 3001;

const exphbs = require('express-handlebars');
const hbs = exphbs.create();

const sess = {
    secret: process.env.SESSIONS_PW,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.engine('handlebars', exphbs({ defaultLayout: "main" }));
app.set('view engine', 'handlebars');

var indexRoutes = require("./controllers/index.js");

app.use("/", indexRoutes);

var indexAPIRoutes = require("./controllers/api/index.js");

app.use("/indexAPI", indexAPIRoutes);

var userRoutes = require("./controllers/api/user-routes/.js");

app.use("/users", userRoutes);

var dashboardRoutes = require("./controllers/dashboard-routes.js");

app.use("/dashboard-routes", dashboardRoutes);

var homeRoutes = require("./controllers/home-routes.js");

app.use("/home-routes", homeRoutes);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));

//turn on routes
app.use(routes);

//turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'))
});