'use strict';

const path = require('path');
const umdConfig = require('../../config/webpack.umd');
const appConfig = require('../../config/webpack.app');
const webpack = require('webpack');
const fs = require('fs');

const CWD = process.cwd();
const PACKAGE = require(path.join(CWD, 'package.json'));
const APP_BUILD_ENTRY = path.join(CWD, PACKAGE.scv.appBuildEntry);
const UMD_BUILD_ENTRY = path.join(CWD, PACKAGE.scv.umdBuildEntry);

module.exports = (args, done) => {

  let umdBuildConfig = args.options.umdBuildConfig ?
    require(path.resolve(process.cwd(), args.options.umdBuildConfig)) :
    umdConfig;

  let appBuildConfig = args.options.appBuildConfig ?
    require(path.resolve(process.cwd(), args.options.appBuildConfig)) :
    appConfig;

  function step2 () {
    if (fs.existsSync(APP_BUILD_ENTRY)) {
      console.log(' --- building the app --- ');
      webpackBuild(appBuildConfig, done);
    } else {
      done();
    }
  }

  if (fs.existsSync(UMD_BUILD_ENTRY)) {
    console.log(' --- building the umd ---');
    webpackBuild(umdBuildConfig, step2);
  } else {
    step2();
  }

};

function webpackBuild (config, done) {

  webpack(config, (err, stats) => {
    if (!err) {
      console.log(stats.toString({colors: true}));
    } else {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
    }
    done();
  });

}
