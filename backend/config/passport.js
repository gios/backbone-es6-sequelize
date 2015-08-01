var LocalStrategy   = require("passport-local").Strategy;

var mysql = require("mysql");
var dbconfig = require("./database_credentials");
var connection = mysql.createConnection(dbconfig.connection);

connection.query("USE " + dbconfig.database);

module.exports = function(passport) {

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		connection.query("SELECT * FROM users WHERE id = ? ", [id], function(err, rows) {
			done(err, rows[0]);
		});
	});

	passport.use("local-login", new LocalStrategy({
    	usernameField: "username",
		passwordField: "password",
		passReqToCallback: true
	}, function(req, username, password, done) {
		console.log(username, password);
		connection.query("SELECT * FROM users WHERE username = ?", [username], function(err, rows) {
			if (err) return done(err);
			if (!rows.length) {
				return done(null, false, console.log("No user found."));
			}
			if (password !== rows[0].password) {
				return done(null, false, console.log("Oops! Wrong password."));
      }
			return done(null, rows[0]);
		});
	}));
};
