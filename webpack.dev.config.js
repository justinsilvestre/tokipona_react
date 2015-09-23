var c = require('./webpack.config');
var webpack = require('webpack');
var path = require('path');

c.devtool = 'eval';

c.entry = c.entry.concat([
  'webpack-hot-middleware/client',
  './src/index.js'
]);
c.output.publicPath = '/static/';

c.plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
];

c.module.loaders = c.module.loaders.concat([
	{
    test: /\.scss/,
    loaders: ['sass', 'css', 'style'],
    include: path.join(__dirname, 'src')
  }
]);

module.exports = c;
