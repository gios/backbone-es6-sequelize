var express = require("express");
var app = express();
var passport = require("passport");
var flash = require('connect-flash');
var morgan = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("express-session");

var getSQL = require("./config/database_connector");
require("./config/passport")(passport);

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
