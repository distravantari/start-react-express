// =======================
// Import Libraries
// =======================
var express = require("express");
var hbs = require("hbs");
var hbsutils = require("hbs-utils")(hbs);
var compress = require("compression");
var http = require('http');

var app = express();

global.__root = __dirname + "/"; // eslint-disable-line

process.on("uncaughtException", function (err) {
	console.log("Caught exception: " + err); // eslint-disable-line
});

// =======================
// Expressjs Configuration
// =======================
app.use(compress());
app.use("/assets", express.static(__dirname + "/assets")); // eslint-disable-line
app.use("/public", express.static(__dirname + "/public")); // eslint-disable-line

hbs.registerPartials(__dirname + "/views/partials"); // eslint-disable-line
hbsutils.registerWatchedPartials(__dirname + "/views/partials"); // eslint-disable-line

app.set("view engine", "hbs");
app.set("views", __dirname + "/views"); // eslint-disable-line
app.disable("x-powered-by");

// =======================
// Database Configuration
// =======================
require(__root + "server/database");

// =======================
// Routes
// =======================
require(__root + "server/config/routes")(app);

// =======================
// HTTP server
// =======================
var server = http.createServer(app);

// =======================
// WebSocket server
// =======================
var io = require('socket.io')(server);
io.on('connection', require('./server/socket/face'));

// =======================
// Launch Application
// =======================
var PORT = 3010;
// app.listen(PORT);
server.listen(PORT, function () {
  console.log('HTTP server listening on port ' + PORT);
});