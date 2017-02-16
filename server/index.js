/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/* global __root */

	var assets = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()); // eslint-disable-line
	var multer = __webpack_require__(2); // to upload the secret face to a temporary file
	var upload = multer({ dest: './client/store/picture' }); // this is the temporary destination file

	// =======================
	// Routes
	// =======================
	exports.routes = function (app) {

		app.get("/admin/ping", function (req, res) {
			res.send("pong");
			// res.redirect('/users');
		});

		app.get("/", function (req, res) {
			res.locals = { headerType: "" };
			res.render("pages/home", { title: "Crypto", assets: assets });
		});

		app.get("*", function (req, res) {
			res.render("pages/404", { layout: false, title: "404 Page", assets: assets });
		});

		app.post('/upload', upload.single('photo'), function (req, res) {
			res.send("success");
			res.end(req.file);
		});
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	function webpackContext(req) {
		throw new Error("Cannot find module '" + req + "'.");
	}
	webpackContext.keys = function() { return []; };
	webpackContext.resolve = webpackContext;
	module.exports = webpackContext;
	webpackContext.id = 1;


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("multer");

/***/ }
/******/ ]);