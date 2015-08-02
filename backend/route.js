module.exports = function(app, passport) {

	app.get("/error_login", function(req, res) {
		res.end(req.flash("loginMessage").toString());
	});

	app.get("/session", function(req, res) {
		res.end(JSON.stringify(req.user));
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
