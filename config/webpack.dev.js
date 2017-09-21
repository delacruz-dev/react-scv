'use strict';

const core = require('./webpack.core');
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

const CWD = process.cwd();
const PACKAGE = require(path.join(CWD, 'package.json'));
const SRC_FILE = path.join(CWD, PACKAGE.scv.appBuildEntry);
const PROXY_CONFIG = PACKAGE.scv.proxy;
const SRC = path.dirname(SRC_FILE);
const HtmlPlugin = require('html-webpack-plugin');

let devConfig = merge(core, {
  entry: ['babel-polyfill', 'whatwg-fetch', SRC_FILE],
  devtool: 'source-map',
  plugins: [
    new HtmlPlugin(merge({
      template: path.join(__dirname, '../src/template.ejs'),
      hash: true,
      xhtml: true
    }, PACKAGE.scv.html || {})),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.bundle.js'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // https://github.com/MoOx/eslint-loader#noerrorsplugin
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DllReferencePlugin({
        context: '.',
        manifest: require(path.join(CWD, 'build/app/app-dll-manifest.json'))
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        enforce: "pre",
        include: [SRC],
        loader: 'eslint-loader',
        options:{
            configFile: path.join(__dirname, 'eslint.dev.js'),
            useEslintrc: false
        }
      },
    ]
  },
  devServer: {
    contentBase: [path.join(process.cwd(), 'src'), path.join(process.cwd(), 'build/app')],

    // Enable history API fallback so HTML5 History API based
    // routing works. This is a good default that will come
    // in handy in more complicated setups.
    historyApiFallback: true,

    hot: true,

    // Display only errors to reduce the amount of output.
    stats: 'errors-only',
    //stats: { colors: true, maxModules: 1000 }

    disableHostCheck: true

  }
});

if(PROXY_CONFIG){
  devConfig.devServer.proxy = PROXY_CONFIG;
}

module.exports = devConfig;
