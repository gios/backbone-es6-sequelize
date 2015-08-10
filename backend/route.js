var UserController = require('./controllers/users.js');
module.exports = function(app, passport, getSQL) {

	app.get("/error_login", function(req, res) {
		res.end(req.flash("loginMessage").toString());
	});

	app.get("/session", function(req, res) {
		UserController.getSessionCredentials(req.user.type_id, function(data) {
			console.log(data);
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
