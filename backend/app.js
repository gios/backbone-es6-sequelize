var express = require("express"),
    app = express(),
    passport = require("passport"),
    flash = require('connect-flash'),
    morgan = require("morgan"),
    cookieParser = require("cookie-parser"),
    bodyParser = require("body-parser"),
    session = require("express-session"),
    Sequelize = require('sequelize');

global.sequelize = new Sequelize('intime', 'root', '0987654321', {
	host: 'localhost',
  	dialect: 'mysql',

  	pool: {
    	max: 5,
    	min: 0,
    	idle: 10000
  	}
});

require("./config/passport")(passport);
require("./models/Group.js");

app.use(express.static("../frontend/dist"));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: "intime",
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require("./route.js")(app, passport);

app.listen(3000, function () {
  console.log("Intime listening at localhost:3000");
});
