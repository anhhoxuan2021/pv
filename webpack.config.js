const webpack = require('webpack')
	const HtmlWebpackPlugin = require('html-webpack-plugin')
	//const ExtractTextPlugin = require("extract-text-webpack-plugin");
	module.exports = {
    entry: [
    'webpack-dev-server/client?http://localhost:88',
    'webpack/hot/only-dev-server',
    './src/index.js'
  ],

  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
			loader:'babel-loader',
			
      query: {
				   presets: ['es2015', 'react']
				}
    },
		{
          test: /\.css$/,
					use: [ 'style-loader', 'css-loader' ],
				
		 },

		/* {
			test: /\.less$/,
			loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
		 },*/

		

		 { test: /\.(png|jpg|gif|svg|woff|woff2|ttf|eot|otf)$/, loader: 'file-loader?name=./images/[name].[ext]' }
	//	{test: /\.(svg|woff|woff2|ttf|eot|otf)([\?]?.*)$/, loader: 'file-loader?name=assets/fonts/[name].[ext]',}
	/*
 						{ test: /(\.js$)|(\.jsx$)/, exclude: /node_modules/, loader: 'babel-loader' },
            { test: /(\.jade$)/, exclude: /node_modules/, loader: 'jade-loader' },
            { test: /(\.css$)/, exclude: /node_modules/, loaders: ['style-loader', 'css-loader', 'postcss-loader'] },
            { test: /(\.styl$)/, exclude: /node_modules/, loaders: ['style-loader', 'css-loader', 'stylus-loader'] },
            { test: /\.(jpe|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/, exclude: /node_modules/, loader: 'url-loader?importLoaders=1&limit=100000' },
            { test: /\.jsx$/, exclude: /node_modules/, loader: 'react-hot-loader' }
	*/

	]
  },

	  output: {
		path: __dirname + '/build',
		publicPath: '/',
		filename: 'bundle.js'
	  },

	  devServer: {
		historyApiFallback: true,
		contentBase: './build',
		 hot: true,
		 port: 88,
		 inline: true
	  },

	  plugins: [
		new HtmlWebpackPlugin({
		  template: 'public/index.html',
		  inject: true
		}),
	//	new ExtractTextPlugin("[name].css")
	],

	node: {fs: 'empty'},
	externals: [
	  {'./cptable': 'var cptable'},
		{'./jszip': 'jszip'},
		{'canvg': "canvg"},
		{'html2canvas': "html2canvas"},
		{'dompurify': "dompurify"},		
	]
	}
