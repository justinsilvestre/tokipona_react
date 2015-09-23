var path = require('path');

module.exports = {
  entry: [],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    libraryTarget: 'var',
    library: 'Tokipona'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    }]
  },
  externals: { react: 'React' }
};
