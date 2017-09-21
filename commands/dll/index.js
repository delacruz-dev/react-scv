'use strict';

const dllConfig = require('../../config/webpack.dll');
const webpackBuild = require('../../src/webpackBuild');

module.exports = (args, done) => {

  console.log(' --- building the dll --- ');

  webpackBuild(dllConfig, done);

};
