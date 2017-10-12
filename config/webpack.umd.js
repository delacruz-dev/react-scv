'use strict';

const overrides = require('../src/overrides');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

const CWD = process.cwd();
const PACKAGE = require(path.join(CWD, 'package.json'));
const UMD_SRC_FILE = path.join(CWD, PACKAGE["react-scv"].umdBuildEntry);
const SRC = path.dirname(UMD_SRC_FILE);
const BUILD = path.join(CWD, 'build/umd');
const nodeExternals = require('webpack-node-externals');

module.exports = function (config, cursors) {

  const coreConfig = require('./webpack.core')(config, cursors);

  return merge(coreConfig, {
    devtool: 'source-map', //note: not working in conjunction with UglifyJsPlugin, see UglifyJsPlugin configuration below
    entry: [UMD_SRC_FILE],
    output: {
      path: BUILD,
      filename: 'umd.js',
      library: PACKAGE.name,
      libraryTarget: 'umd',
      umdNamedDefine: true
    },
    module: {
      rules: [
        cursors.push('eslint-rule', {
          test: /\.jsx?$/,
          enforce: "pre",
          include: [SRC],
          loader: 'eslint-loader',
          options: {
            configFile: overrides.filePath(path.join(__dirname, 'eslint.prod.js')),
            useEslintrc: false
          }
        })
      ]
    },
    externals: [nodeExternals()],
    plugins: [
      cursors.push('clean-webpack-plugin',
        new CleanWebpackPlugin([BUILD], {root: CWD})
      ),
      cursors.push('uglify-js-plugin',
        new webpack.optimize.UglifyJsPlugin({
          compress: {warnings: false},
          output: {comments: false},
          sourceMap: true //needed because of http://stackoverflow.com/questions/41942811/webpack-2-devtool-not-working
        })
      )
    ]
  });

}
