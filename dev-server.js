var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

const port = 3000;

new WebpackDevServer(webpack(config), {
  publicPath: '/build/',
  historyApiFallback: true
}).listen(port, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log(`Listening at http://127.0.0.1:${port}`);
});
