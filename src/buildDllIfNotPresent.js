const webpackBuild = require('./webpackBuild');
const dllConfig = require('../config/webpack.dll');
const fs = require('fs');
const path = require('path');

module.exports = function buildDllIfNotPresent (cb) {

  console.log(' --- checking dll existence --- ');

  if (!fs.existsSync(path.join(process.cwd(), 'build/app/app-dll-manifest.json')) || !fs.existsSync(path.join(process.cwd(), 'build/app/app-dll.js'))) {

    console.log('dll not found');

    console.log(' --- building dll ---');

    webpackBuild(dllConfig, cb);

  } else {
    console.log('dll found, no need to build them again');
    cb();
  }

}

