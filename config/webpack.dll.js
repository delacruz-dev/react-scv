'use strict';

module.exports = function () {

  const overrides = require('../src/overrides');
  const core = require('./webpack.core');
  const merge = require('webpack-merge');
  const path = require('path');
  const webpack = require('webpack');
  const CWD = process.cwd();
  const dlls = overrides.require(require.resolve('./dlls'));
  const createCursors = require('cursorify').createCursors;

  const isProduction = process.env.NODE_ENV === 'production';
  const BUILD = isProduction ? path.join(CWD, 'build/app') : path.join(CWD, 'build/dev');

  const coreConfig = core({}, createCursors());

  let config = merge(coreConfig, {
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

  if (isProduction) {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false},
      output: {comments: false}
    }))
  }

  return config;

}
