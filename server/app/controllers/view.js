
var assets = require(__root + "public/assets.json"); // eslint-disable-line

module.exports = {
  homePage: (req, res, next) => {
    res.locals = { headerType: "" };
		res.render("pages/home", { title: "Crypto", assets: assets });
  },
  errorPage: (req, res, next) => {
    res.render("pages/404", { layout: false, title: "404 Page", assets: assets });
  }
};