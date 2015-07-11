var LocalStrategy   = require("passport-local").Strategy;

var mysql = require("mysql");
var bcrypt = require("bcrypt");
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

	passport.use("local-signup", new LocalStrategy({
		usernameField: "username",
		passwordField: "password",
    chapterField: "chapter",
    typeField: "type",
		passReqToCallback: true
	}, function(req, username, password, chapter, type, done) {
		connection.query("SELECT * FROM users WHERE username = ?", [username], function(err, rows) {
			if (err) return done(err);
			if (rows.length) {
				return done(null, false, req.flash("signupMessage", "That username is already taken."));
			} else {
				var newUserMysql = {
					username: username,
					password: bcrypt.hashSync(password),
          chapter: chapter,
          type: type
				};

				var insertQuery = "INSERT INTO users ( username, password, chapter, type ) values (?,?,?,?)";
				connection.query(insertQuery, [newUserMysql.username, newUserMysql.password, newUserMysql.chapter, newUserMysql.type], function(err, rows) {
					newUserMysql.id = rows.insertId;
					return done(null, newUserMysql);
				});
			}
		});
	}));

	passport.use("local-login", new LocalStrategy({
    usernameField: "username",
		passwordField: "password",
    chapterField: "chapter",
    typeField: "type",
		passReqToCallback: true
	}, function(req, username, password, chapter, type, done) {
		connection.query("SELECT * FROM users WHERE username = ?", [username], function(err, rows) {
			if (err) return done(err);
			if (!rows.length) {
				return done(null, false, req.flash("loginMessage", "No user found."));
			}
			if (!bcrypt.compareSync(password, rows[0].password)) {
				return done(null, false, req.flash("loginMessage", "Oops! Wrong password."));
      }
			return done(null, rows[0]);
		});
	}));
};
