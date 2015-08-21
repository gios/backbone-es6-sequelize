var LocalStrategy = require("passport-local").Strategy,
	User = require("../models/User.js");

module.exports = function(passport) {

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.find({ where: { id: id } }).then(function(user) {
	    	done(null, user);
	  	}).catch(function(err){
	    	done(err, null);
	  	});
	});

	passport.use("local-login", new LocalStrategy({
    	usernameField: "username",
		passwordField: "password",
		passReqToCallback: true
	}, function(req, username, password, done) {
		User.find({ where: { username: username }}).then(function(user) {
      		if (!user) {
        		done(null, false, req.flash("loginMessage", "No user found."));
      		} else if (password != user.password) {
        		done(null, false, req.flash("loginMessage", "Oops! Wrong password."));
      		} else {
        		done(null, user);
      		}
    	}).catch(function(err){
      		done(err);
    	});
	}));
};
