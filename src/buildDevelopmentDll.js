const webpackBuild = require('./webpackBuild');
const dllConfig = require('../config/webpack.dll');

module.exports = function () {

  console.log(' --- building dll for development ---');

  process.env.NODE_ENV = 'development';

  return webpackBuild(dllConfig());

}
