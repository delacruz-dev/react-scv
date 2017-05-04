'use strict';

const core = require('./webpack.core');
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const exists = require('exists-file').sync;

const CWD = process.cwd();
const PACKAGE = require(path.join(CWD, 'package.json'));
const FLOW_EXE = path.join(CWD, 'node_modules/.bin/flow');
const FLOW_TARGET = path.join(CWD ,'/node_modules/workshare-scv/config/');
const SRC_FILE = path.join(CWD, PACKAGE.config.appBuildEntry);
const PROXY_CONFIG = PACKAGE.config.proxy;
const SRC = path.dirname(SRC_FILE);
const HtmlPlugin = require('html-webpack-plugin');
const FlowStatusWebpackPlugin = require('flow-status-webpack-plugin');
const USER_TEMPLATE = path.join(SRC, 'template.ejs');

let devConfig = merge(core, {
  entry: ['babel-polyfill', 'whatwg-fetch', SRC_FILE],
  devtool: 'source-map',
  plugins: [
    new HtmlPlugin(merge({
      template: exists(USER_TEMPLATE) ?
          USER_TEMPLATE :
          path.join(__dirname, '../src/template.ejs'),
      hash: true,
      xhtml: true
    }, PACKAGE.config.html || {})),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.bundle.js'
    }),
    new webpack.HotModuleReplacementPlugin(),
    // https://github.com/MoOx/eslint-loader#noerrorsplugin
    new webpack.NoErrorsPlugin(),
    new FlowStatusWebpackPlugin({
        root: FLOW_TARGET,
        binaryPath: FLOW_EXE,
        flowArgs: ' --include '+ CWD,
        failOnError: true
    })
  ],
  eslint: {
    configFile: path.join(__dirname, 'eslint.dev.js')
  },
  devServer: {
    contentBase: path.join(process.cwd(), 'src'),

    // Enable history API fallback so HTML5 History API based
    // routing works. This is a good default that will come
    // in handy in more complicated setups.
    historyApiFallback: true,

    hot: true,
    progress: true,

    // Display only errors to reduce the amount of output.
    stats: 'errors-only'

  }
});

if(PROXY_CONFIG){
  devConfig.devServer.proxy = PROXY_CONFIG;
}

module.exports = devConfig;
