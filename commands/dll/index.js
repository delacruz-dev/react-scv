'use strict';

const dllConfig = require('../../config/webpack.dll');
const webpackBuild = require('../../src/webpackBuild');
const fs = require('fs');

module.exports = (args, done) => {

  process.on('SIGINT', done);

  if (fs.existsSync('./node_modules')) {

    console.log(' --- building the dll --- ');

    return webpackBuild(dllConfig).then(done);

  }

};
