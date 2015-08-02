var express = require("express");
var app = express();
var passport = require("passport");
var morgan = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("express-session");

var getSQL = require("./config/database_connector");
require("./config/passport")(passport);

app.use(express.static("../frontend/dist"));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser());

app.use(session({ secret: "intime" }));
app.use(passport.initialize());
app.use(passport.session());

require("./route.js")(app, passport);

app.listen(3000, function () {
  console.log("Intime listening at localhost:3000");
});
