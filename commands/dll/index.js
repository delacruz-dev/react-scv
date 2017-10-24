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
  return prevDirNameIsNodeModules() || prevDirIsAScopedModuleFolder();
}

function prevDirNameIsNodeModules () {
  const prevDirName = path.basename(path.join(process.cwd(), '../'));
  return prevDirName === "node_modules";
}

function prevDirIsAScopedModuleFolder () {
  const prevDirName = path.basename(path.join(process.cwd(), '../'));
  const prevPrevDirName = path.basename(path.join(process.cwd(), '../../'));
  return prevDirName.substring(0, 1) === "@" && prevPrevDirName === "node_modules";
}
