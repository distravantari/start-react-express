/* global __root */

var controllers = require('../app/controllers')

// =======================
// Routes
// =======================
module.exports = function (app) {

	app.get("/admin/ping", (req, res) => {
		res.send("pong");
		// res.redirect('/users');
	}); 
	
	app.post("/login", controllers.user.login);
	app.get("/getAll", controllers.user.getAll);
	app.get("/", controllers.view.homePage);
	app.get("*", controllers.view.errorPage);
	app.post('/upload', controllers.upload);

};
