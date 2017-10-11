'use strict';

const dllConfig = require('../../config/webpack.dll');
const webpackBuild = require('../../src/webpackBuild');
const fs = require('fs');
const path = require('path');

module.exports = (args, done) => {

  process.on('SIGINT', done);

  if (!isRunningOnADependency()) {

    console.log(' --- building the dll --- ');

    return webpackBuild(dllConfig).then(done);

  }

};

function isRunningOnADependency () {
  const prevDirName = path.basename(path.join(process.cwd(), '../'));
  return prevDirName === "node_modules";
}
