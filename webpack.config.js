var DEBUG = process.env.DEBUG;

var _ = require("lodash");

var autoprefixer = require("autoprefixer");

var path = require("path");
var webpack = require("webpack");

var nodeExternals = require('webpack-node-externals');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var WebpackErrorNotificationPlugin = require("webpack-error-notification");
var webpackFailPlugin = function () {
	this.plugin("done", function (stats) {
		if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf("--watch") === -1) { // eslint-disable-line
			process.on("beforeExit", function () {
				process.exit(1);
			});
		}
	});
};

var AssetsPlugin = require("assets-webpack-plugin");
var assetsPluginInstance = new AssetsPlugin({
	filename: "./public/assets.json"
});

var devFlagPlugin = new webpack.DefinePlugin({
	__DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || "false"))
});

var CLIENT_ROOT = path.resolve(__dirname, "./client");
var SERVER_ROOT = path.resolve(__dirname, "./server");
var STYLES_ROOT = path.resolve(__dirname, "./styles");

var VENDOR_MODULES = [
	"react"
];

var MODULES = {
	site: "./client/site"
};

const sassLoaders = [
	"css-loader",
	"postcss-loader",
	"sass-loader?indentedSyntax=sass&includePaths[]=" + path.resolve(__dirname, "./style") // eslint-disable-line
];

module.exports = [
	{
		entry: _.merge(MODULES, {
			vendor: VENDOR_MODULES
		}),
		output: {
			path: path.resolve(__dirname, "./public"),
			filename: "[name].bundle.js",
			pathinfo: DEBUG
		},
		module: {
			noParse: [
				/[\/]jquery[\/]/,
				/[\/]slideout[\/]/,
				/[\/]highcharts[\/]/
			],
			preLoaders: [{
				test: /\.(es6|js|jsx)$/,
				loader: "eslint-loader", // to avoid confusion with `eslint` module
				include: _.merge([CLIENT_ROOT, SERVER_ROOT, STYLES_ROOT])
			}],
			eslint: {
				emitError: true,
				failOnError: true
			},
			loaders: [
				{
					test: /\.(woff|woff2|ttf|eot|svg)$/,
					loader: "file",
					query: { name: "fonts/[name].[ext]" },
				}, {
					test: /\.png$/,
					loader: "file?name=[name].[ext]"
				}, {
					test: /\.css$/,
					loader: ExtractTextPlugin.extract("css-loader")
				}, {
					test: /\.scss$/,
					loader: ExtractTextPlugin.extract("style-loader", sassLoaders.join("!"))
				}, {
					test: /\.(js|jsx|es6)$/,
					exclude: /(node_modules)/,
					loader: "babel-loader",
					query: {
						presets: ["es2015", "react"]
					}
				},
				{
					test: /\.json$/, loader: 'json'
				}
			]
		},
		resolve: {
			extensions: ["", ".js", ".es6", ".jsx"],
			modulesDirectories: ["node_modules"],
			alias: {
				"az-client": CLIENT_ROOT,
				"az-server": SERVER_ROOT,
				"az-styles": STYLES_ROOT,
				"jquery$": "jquery/dist/jquery",
				"bootstrap$": "bootstrap/dist/js/bootstrap.min"
			}
		},
		postcss: [
			autoprefixer({
				browsers: ["last 2 versions"]
			})
		],
		plugins: [
			new webpack.ProvidePlugin({
				"window.jQuery": "jquery",
				$: "jquery",
				jQuery: "jquery",
				React: "react"
			}),
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify('development'),
				DEBUG: DEBUG
			}),
			new webpack.optimize.OccurenceOrderPlugin(true),
			new webpack.optimize.CommonsChunkPlugin({
				name: "vendor",
				filename: "vendor.bundle.js",
				minChunks: Infinity
			}),
			new webpack.NoErrorsPlugin(),
			assetsPluginInstance,
			devFlagPlugin,
		].concat(DEBUG ? [
			new WebpackErrorNotificationPlugin()
		] : [
			new webpack.optimize.UglifyJsPlugin({
				mangle: false,
				compress: false
			}),
			webpackFailPlugin
		]).concat([
			new ExtractTextPlugin("[name].css"),
			new webpack.NoErrorsPlugin()
		]),
		debug: DEBUG,
		devtool: DEBUG ? "cheap-module-source-map" : "hidden-cheap-module-source-map",
	},

	// =======================
	// SET SERVICE TO USE ES6
	// =======================
	// {
	// 	entry: './server/config/routes',
	// 	output: {
	// 		path: './',
	// 		filename: 'server/index.js',
	// 	},
	// 	resolve: {
	// 		extensions: ["", ".js", ".es6", ".jsx"],
	// 		modulesDirectories: ["node_modules"],
	// 		alias: {
	// 			"az-client": CLIENT_ROOT,
	// 			"az-server": SERVER_ROOT,
	// 			"az-styles": STYLES_ROOT,
	// 			"jquery$": "jquery/dist/jquery",
	// 			"bootstrap$": "bootstrap/dist/js/bootstrap.min"
	// 		}
	// 	},
	// 	module: {
	// 		noParse: [
	// 			/[\/]jquery[\/]/,
	// 			/[\/]slideout[\/]/,
	// 			/[\/]highcharts[\/]/
	// 		],
	// 		preLoaders: [{
	// 			test: /\.(es6|js|jsx)$/,
	// 			loader: "eslint-loader", // to avoid confusion with `eslint` module
	// 			include: _.merge([CLIENT_ROOT, SERVER_ROOT, STYLES_ROOT])
	// 		}],
	// 		loaders: [{
	// 			exclude: /node_modules/,
	// 			loader: 'babel',
	// 			query: {
	// 				presets: ['react', 'es2015', 'stage-1']
	// 			}
	// 		}]
	// 	},
	// 	target: 'node',
	// 	externals: [nodeExternals()],
	// 	resolve: {
	// 		extensions: ['', '.js', '.jsx']
	// 	}
	// }
]
