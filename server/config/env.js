var path     = require('path');
var express  = require('express');
var bodyParser = require('body-parser');
var settings = require('./settings');
var compress = require("compression");
var hbs      = require("hbs");
var hbsutils = require("hbs-utils")(hbs);
var models   = require('../app/models/');

module.exports = function (app) {
    // app.use(compress());

    app.use(bodyParser.json() );
    app.use(bodyParser.urlencoded({ extended: false }));  

    app.use("/assets", express.static(__root + "/assets")); // eslint-disable-line
    app.use("/public", express.static(__root + "/public")); // eslint-disable-line

    // for website purpose
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    hbs.registerPartials(__root + "/views/partials"); // eslint-disable-line
    hbsutils.registerWatchedPartials(__root + "/views/partials"); // eslint-disable-line

    app.set("view engine", "hbs");
    app.set("views", __root + "/views"); // eslint-disable-line

    app.use(function (req, res, next) {
      models(function (err, db) {
        if (err) return next(err);

        req.models = db.models;
        req.db     = db;

        return next();
      });
    })

    app.disable("x-powered-by");
    
};
