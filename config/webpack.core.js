'use strict';

const DefinePlugin = require('webpack').DefinePlugin;
const path = require('path');
const qs = require('qs');

const CWD = process.cwd();
const BUILD = path.join(CWD, 'build');
const CWD_NODE_MODULES = path.join(CWD, 'node_modules');
const NODE_MODULES = path.join(__dirname, '../node_modules');
const PACKAGE = require(path.join(CWD, 'package.json'));
const SRC_FILE = path.join(CWD, PACKAGE["react-scv"].appBuildEntry);
const SRC = path.dirname(SRC_FILE);
const TESTS = path.join(CWD, 'tests');
const ENV = Object
  .keys(process.env)
  .filter(key => key.toUpperCase().startsWith('NEO_'))
  .reduce((env, key) => {
    env[`process.env.${key}`] = JSON.stringify(process.env[key]);
    return env;
  }, {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  });

var ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin');

module.exports = function (config, cursors) {

  return {
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
        cursors.push('html-rule', {
          test: /\.html$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          }
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
                  'babel-preset-flow',
                  'babel-preset-stage-0',
                  'babel-preset-react'
                ],
                plugins: [
                  'react-hot-loader/babel'
                ]
              }
            },
          ],
        }),
        cursors.push('woff-rule', {
          test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff'
          }
        }),
        cursors.push('ttf-rule', {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader',
          options: {
            limit: '10000',
            mimetype: 'application/octet-stream'
          }
        }),
        cursors.push('eot-rule', {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'file-loader'
        }),
        cursors.push('svg-rule', {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader',
          options: {
            limit: '10000',
            mimetype: 'image/svg+xml'
          }
        }),
        cursors.push('png-rule', {
          test: /\.(png)$/,
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }),
        cursors.push('jpg-rule', {
          test: /\.(jpe?g)$/,
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }),
        cursors.push('gif-rule', {
          test: /\.(gif)$/,
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }),
        cursors.push('ico-rule', {
          test: /\.ico(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader'
        })
      ]
    }
  };

}
