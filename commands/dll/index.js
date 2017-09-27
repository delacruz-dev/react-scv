'use strict';

const dllConfig = require('../../config/webpack.dll');
const webpackBuild = require('../../src/webpackBuild');
const fs = require('fs');

module.exports = (args, done) => {

  if (fs.existsSync('./node_modules')) {

    console.log(' --- building the dll --- ');

    webpackBuild(dllConfig, done);

  }

};
