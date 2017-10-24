'use strict';

const overrides = require('../src/overrides');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

const CWD = process.cwd();
const PACKAGE = require(path.join(CWD, 'package.json'));
const APP_SRC_FILE = path.join(CWD, PACKAGE["react-scv"].appBuildEntry);
const SRC = path.dirname(APP_SRC_FILE);
const BUILD = path.join(CWD, 'build/app');

module.exports = function (config, cursors) {

  const coreConfig = require('./webpack.core')(config, cursors);

  return merge(coreConfig, {
    //devtool: 'source-map', //note: not working in conjunction with UglifyJsPlugin, see UglifyJsPlugin configuration below
    entry: [APP_SRC_FILE],
    output: {
      path: BUILD,
      filename: 'app.js'
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
        }),
      ]
    },
    plugins: [
      cursors.push('clean-webpack-plugin',
        new CleanWebpackPlugin([BUILD], {
          root: CWD,
          exclude: ['app-dll.js', 'app-dll-manifest.json'],
          verbose: true,
        })
      ),
      cursors.push('dll-reference-plugin',
        new webpack.DllReferencePlugin({
          context: '.',
          manifest: require(path.join(CWD, 'build/app/app-dll-manifest.json'))
        })
      ),
      cursors.push('uglify-js-plugin',
        new webpack.optimize.UglifyJsPlugin({
          compress: {warnings: false},
          output: {comments: false},
          //sourceMap: true //needed because of http://stackoverflow.com/questions/41942811/webpack-2-devtool-not-working
        })
      ),
      cursors.push('html-webpack-plugin',
        new HtmlWebpackPlugin(merge({
          template: path.join(__dirname, '../src/template.ejs'),
          hash: true,
          xhtml: true
        }, PACKAGE["react-scv"].html || {}))
      ),
      cursors.push('add-asset-html-webpack-plugin',
        new AddAssetHtmlWebpackPlugin({
          filepath: path.join(CWD, 'build/app/app-dll.js'),
          includeSourcemap: false,
          hash: true,
        })
      ),
    ]
  });

}
