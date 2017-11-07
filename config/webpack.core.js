'use strict';

const DefinePlugin = require('webpack').DefinePlugin;
const path = require('path');
const CWD = process.cwd();
const BUILD = path.join(CWD, 'build');
const CWD_NODE_MODULES = path.join(CWD, 'node_modules');
const NODE_MODULES = path.join(__dirname, '../node_modules');
const PACKAGE = require(path.join(CWD, 'package.json'));
const SRC_FILE = path.join(CWD, PACKAGE["react-scv"].appBuildEntry);
const SRC = path.dirname(SRC_FILE);
const TESTS = path.join(CWD, 'tests');
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin');
const merge = require('webpack-merge');

module.exports = function (config, cursors) {

  const ENV = Object
  .keys(process.env)
  .filter(key => key.toUpperCase().startsWith('NEO_'))
  .reduce((env, key) => {
    env[`process.env.${key}`] = JSON.stringify(process.env[key]);
    return env;
  }, {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  });

  return merge(config, {
    output: {
      path: BUILD,
      filename: 'bundle.js',
      publicPath: '/'
    },
    plugins: [
      cursors.push('define-plugin',
        new DefinePlugin(ENV)
      ),
      cursors.push('progress-bar-webpack-plugin',
        new ProgressBarWebpackPlugin({clear: false})
      )
    ],
    resolve: {
      modules: [NODE_MODULES, CWD_NODE_MODULES],
      extensions: ['.js', '.jsx', '.json']
    },
    resolveLoader: {
      modules: [NODE_MODULES, CWD_NODE_MODULES]
    },
    module: {
      rules: [
        cursors.push('source-map-rule', {
          test: /\.jsx?$/,
          enforce: "pre",
          use: [
            {loader: 'source-map-loader'}
          ]
        }),
        cursors.push('style-rule', {
          test: /\.s?css$/, // alternative *** : ^(?:(?:[^\.\s]+\.)(?!module))+s?css$
          use: [
            {loader: 'style-loader'},
            {loader: 'css-loader'},
            {loader: 'sass-loader'},
          ]
        }),
        cursors.push('style-module-rule', {
          test: /\.s?cssm$/, // alternative *** : \.module\.s?css$
          use: [
            {loader: 'style-loader'},
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[name]_[local]_[hash:base64:3]'
              }
            },
            {loader: 'resolve-url-loader'},
            {loader: 'sass-loader?sourceMap'}
          ]
        }),
        cursors.push('javascript-rule', {
          test: /\.jsx?$/,
          include: [SRC, TESTS],
          exclude: /(node_modules|bower_components)/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                babelrc: false,
                presets: [
                  ['babel-preset-es2015', {"modules": false}], //{ "modules": false } is needed to make react-hot-loader work
                  'babel-preset-stage-0',
                  'babel-preset-react'
                ],
                plugins: [
                  'react-hot-loader/babel'
                ]
              }
            },
          ],
        })
      ]
    }
  });

}
