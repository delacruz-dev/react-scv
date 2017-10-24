const webpackBuild = require('./webpackBuild');
const dllConfig = require('../config/webpack.dll');

module.exports = function () {

  console.log(' --- building dll for production ---');

  process.env.NODE_ENV = 'production';

  return webpackBuild(dllConfig());

}
