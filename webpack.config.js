'use strict'

const path = require("path");
const { VueLoaderPlugin } = require('vue-loader');
const dataObj = require("./data/data.json");

module.exports = {
	entry: [
		'./src/main.js'
	],
	output: {
		path: path.resolve(__dirname, './dist'),
		publicPath: '/dist/',
		filename: 'bundle.js'
    },
	module: {
		rules: [
			{
				test: /\.vue$/,
				use: 'vue-loader'
			},
			{
				test: /\.scss$/,
				use: [
					'vue-style-loader',
					'css-loader',
					'sass-loader',
				]
			},
			{
				test: /\.(png|woff|woff2|eot|ttf|svg)$/,
				use: [
					{ loader: 'url-loader',
						options: {
							limit: 100000 
						}
					},
					{
						loader: 'file-loader'
					}
				]
			}
		]
	},
	plugins: [
		new VueLoaderPlugin()
	],
	resolve: {
		alias: {
			fonts : path.resolve(__dirname, 'src/assets/fonts')
		}
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		port: 9000,
		historyApiFallback: true,
		before: function(app, server, compiler) {
			app.get('/api/categories', function (req, res) {
				res.json(dataObj.categories);
			});

			app.get('/api/category/*', function (req, res) {
				res.json(dataObj.articles);
			});

			app.get('/api/author/*', function (req, res) {
				let author = {};
				const authorId = req.params['0'];

				for (let index = 0; index < dataObj.authors.length; index++) {
					if (dataObj.authors[index].id === authorId) {
						author = dataObj.authors[index];
						break;
					}
					
				}
				res.json(author);
			});

			app.get('/api/search/*', function (req, res) {
				res.json(dataObj.articles);
			});
		}
	}
}