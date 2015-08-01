var express = require("express");
var app = express();
var passport = require("passport");
var morgan = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("express-session");

var getSQL = require("./config/database_connector");
require("./config/passport")(passport);

app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser());

app.use(session({ secret: "intime" }));
app.use(passport.initialize());
app.use(passport.session());

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
};

app.use(allowCrossDomain);

require("./route.js")(app, passport);

app.listen(9000, function () {
  console.log("Intime listening at localhost:9000");
});
