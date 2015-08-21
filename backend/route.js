var UserCtrl = require('./controllers/UserCtrl.js'),
	User = require('./models/User.js'),
	Group = require('./models/Group.js');

module.exports = function(app, passport) {

	app.get("/error_login", function(req, res) {
		res.end(req.flash("loginMessage").toString());
	});

	app.get("/session", isLoggedIn, function(req, res) {
		var userData = {};
		userData.user_id = req.user.id;
		userData.type_id = req.user.type_id;
		res.header("Content-Type", "application/json; charset=utf-8");
		UserCtrl.getSessionCredentials(userData, function(err, data) {
			if (err) return err;
			res.end(JSON.stringify(data));
		});
	});

	app.post("/login", passport.authenticate("local-login", {
            successRedirect : "/session",
            failureRedirect : "/error_login",
            failureFlash : true
		}),
        function(req, res) {
			res.redirect("/");
  	});

	app.get("/logout", function(req, res) {
		req.logout();
		res.redirect("/");
	});

	app.get("/delete", function(req, res) {
		Group.drop();
		User.drop();
	});
};

function isLoggedIn(req, res, next) {

	if (req.isAuthenticated())
		return next();

	res.redirect("/");
}
