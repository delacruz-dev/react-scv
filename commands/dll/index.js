'use strict';

const buildDevelopmentDll = require('../../src/buildDevelopmentDll');
const buildProductionDll = require('../../src/buildProductionDll');
const path = require('path');

module.exports = (args, done) => {

  process.on('SIGINT', done);

  if (!isRunningOnADependency()) {

    console.log(' --- building the dll --- ');

    return buildProductionDll().then(buildDevelopmentDll);

  }

};

function isRunningOnADependency () {
  const prevDirName = path.basename(path.join(process.cwd(), '../'));
  return prevDirName === "node_modules";
}
