'use strict';

var path = require('path');
var _ = require('lodash');

var config = {
  devtool: 'source-map',

  output: {
    path: __dirname + '/build'
  },

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    root: path.resolve(__dirname, './scripts/shared'),
    extensions: ['', '.js']
  }
};

var clientConfig = _.merge({}, config, {
  entry: './scripts/client/index.js',
  output: {
    filename: 'client.js'
  }
});

var serverConfig = _.merge({}, config, {
  entry: './scripts/server/index.js',
  output: {
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },
  target: 'node',
  externals: /^[a-z\-0-9]+$/
});

module.exports = [clientConfig, serverConfig];
