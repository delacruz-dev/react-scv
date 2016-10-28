'use strict';

const Clean = require('clean-webpack-plugin');
const core = require('./webpack.core');
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

const CWD = process.cwd();
const PACKAGE = require(path.join(CWD, 'package.json'));
const UMD_SRC_FILE = path.join(CWD, PACKAGE.config.umdBuildEntry);
const BUILD = path.join(CWD, 'build');
const nodeExternals = require('webpack-node-externals');

module.exports = merge(core, {
  entry: [UMD_SRC_FILE],
  output: {
    path: BUILD,
    filename: 'bundle.js',
    library: PACKAGE.name,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals: [nodeExternals()],
  plugins: [
    new Clean([BUILD], {root: CWD}),
    new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false},
      output: {comments: false},
      sourceMap: false
    })
  ]
});
