'use strict';

var webpack = require('webpack');
var config = require('./webpack.config');
var compiler = webpack(config);

compiler.run(function (err, stats) {
  if (err) console.warn(err);

  console.log(stats.toString());
});
