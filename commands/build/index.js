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

  buildDllIfNotPresent(() => {

    const umdConfig = overrides.require(require.resolve('../../config/webpack.umd'));
    const appConfig = overrides.require(require.resolve('../../config/webpack.app'))

    function step2 () {
      if (fs.existsSync(APP_BUILD_ENTRY)) {
        console.log(' --- building the app --- ');
        webpackBuild(appConfig, done);
      } else {
        done();
      }
    }

    if (fs.existsSync(UMD_BUILD_ENTRY)) {
      console.log(' --- building the umd ---');
      webpackBuild(umdConfig, step2);
    } else {
      step2();
    }

  });

};

