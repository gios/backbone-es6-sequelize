var express = require("express");
var app = express();
var passport = require("passport");
var morgan = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("express-session");
var flash = require('connect-flash');

var getSQL = require("./config/database_connector");
require("./config/passport")(passport);

app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser());
app.set('view engine', 'ejs');

app.use(session({ secret: "hello" }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require("./route.js")(app, passport);

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.get("/data", function(req, res) {
  getSQL("SELECT * FROM users", function(err, result) {
    res.send(result);
  });
});

app.listen(3000, function () {
  console.log("Intime listening at localhost:3000");
});
