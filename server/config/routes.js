/* global __root */

var assets = require(__root + "public/assets.json"); // eslint-disable-line
var multer = require('multer'); // to upload the secret face to a temporary file
var upload = multer({ dest: './client/store/picture' }); // this is the temporary destination file

// =======================
// Routes
// =======================
exports.routes = (app) => {

	app.get("/admin/ping", (req, res) => {
		res.send("pong");
		// res.redirect('/users');
	});

	app.get("/", (req, res) => {
		res.locals = { headerType: "" };
		res.render("pages/home", { title: "Crypto", assets: assets });
	});

	app.get("*", (req, res) => {
		res.render("pages/404", { layout: false, title: "404 Page", assets: assets });
	});

	app.post('/upload', upload.single('photo'), (req, res) => {
		res.send("successfully upload the photo");
		res.end(req.file);
	});

};
