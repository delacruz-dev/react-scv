'use strict';

const overrides = require('../../src/overrides');
const path = require('path');
const buildDllIfNotPresent = require('../../src/buildDllIfNotPresent');
const webpackBuild = require('../../src/webpackBuild');
const webpack = require('webpack');
const fs = require('fs');
const CWD = process.cwd();
const PACKAGE = require(path.join(CWD, 'package.json'));
const APP_BUILD_ENTRY = path.join(CWD, PACKAGE["react-scv"].appBuildEntry);
const UMD_BUILD_ENTRY = path.join(CWD, PACKAGE["react-scv"].umdBuildEntry);

module.exports = (args, done) => {

  process.on('SIGINT', done);

  return buildDllIfNotPresent()
  .then(buildUMD)
  .then(buildApp)
  .then(done);

};

function buildUMD () {
  if (fs.existsSync(UMD_BUILD_ENTRY)) {
    console.log(' --- building the umd ---');
    return webpackBuild(overrides.require(require.resolve('../../config/webpack.umd')));
  }
}

function buildApp () {
  if (fs.existsSync(APP_BUILD_ENTRY)) {
    console.log(' --- building the app --- ');
    return webpackBuild(overrides.require(require.resolve('../../config/webpack.app')));
  }
}
