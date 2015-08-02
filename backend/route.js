module.exports = function(app, passport) {

	app.post('/login', passport.authenticate('local-login'),
		function(req, res) {
			res.end(JSON.stringify(req.user));
  	});

	app.get('/profile', isLoggedIn, function(req, res) {
		res.end(JSON.stringify(req.user));
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};

function isLoggedIn(req, res, next) {

	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}
