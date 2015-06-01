'use strict';

var _ = require('lodash');

var config = {
	output: {
		path: './dist',
    libraryTarget: 'commonjs'
	},

	target: 'node',
  externals: /^[a-z][a-z\.\-0-9]*$/,
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false
  },

	resolve: {
    extensions: ['', '.js']
  },

	module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};

module.exports = [
	_.merge({}, config, {
		entry: './src/index.js',
	  output: {
			filename: 'server.js'
	  }
	}),
	_.merge({}, config, {
		entry: './src/scripts/integrate.js',
		output: {
			filename: 'integrate.js'
		}
	})
];
