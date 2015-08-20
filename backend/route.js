var UserMiddle = require('./middleware/UserMiddle.js');

module.exports = function(app, passport) {

	app.get("/error_login", function(req, res) {
		res.end(req.flash("loginMessage").toString());
	});

	app.get("/session", isLoggedIn, function(req, res) {
		var userData = {};
		userData.user_id = req.user.id;
		userData.type_id = req.user.type_id;
		res.header("Content-Type", "application/json; charset=utf-8");
		UserMiddle.getSessionCredentials(userData, function(err, data) {
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
};

function isLoggedIn(req, res, next) {

	if (req.isAuthenticated())
		return next();

	res.redirect("/");
}
