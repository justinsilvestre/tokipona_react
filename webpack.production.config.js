var c = require('./webpack.config');

c.entry = c.entry.concat([
  './src/runApp.js'
]);

module.exports = c;