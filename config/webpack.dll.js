'use strict';

const overrides = require('../src/overrides');
const core = require('./webpack.core');
const merge = require('webpack-merge');
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const CWD = process.cwd();
const BUILD = path.join(CWD, 'build/app');
const dlls = overrides.require(require.resolve('./dlls'));

module.exports = merge(core, {
  entry: {
    'app': dlls,
  },
  output: {
    filename: '[name]-dll.js',
    path: BUILD,
    library: '[name]_dll',
  },
  plugins: [
    new webpack.DllPlugin({
      // The path to the manifest file which maps between
      // modules included in a bundle and the internal IDs
      // within that bundle
      path: BUILD + '/[name]-dll-manifest.json',
      // The name of the global variable which the library's
      // require function has been assigned to. This must match the
      // output.library option above
      name: '[name]_dll'
    })
  ],
});

