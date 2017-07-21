'use strict';

const DefinePlugin = require('webpack').DefinePlugin;
const path = require('path');
const qs = require('qs');

const CWD = process.cwd();
const BUILD = path.join(CWD, 'build');
const CWD_NODE_MODULES = path.join(CWD, 'node_modules');
const NODE_MODULES = path.join(__dirname, '../node_modules');
const PACKAGE = require(path.join(CWD, 'package.json'));
const SRC_FILE = path.join(CWD, PACKAGE.config.appBuildEntry);
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

var ProgressBarPlugin = require('progress-bar-webpack-plugin');

const loader = name => `${name}-loader?${qs.stringify(require(`.\/${name}`), {
  encode: false,
  arrayFormat: 'brackets'
})}`;

module.exports = {
  output: {
    path: BUILD,
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new DefinePlugin(ENV),
    new ProgressBarPlugin({clear: false})
  ],
  resolve: {
    modules: [NODE_MODULES, CWD_NODE_MODULES],
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      'react/lib/ReactMount': 'react-dom/lib/ReactMount' //TODO needed to make react 15.4.2 work with the 1.X hot reloader, update hot realoder when the 3.0 is stable
    }
  },
  resolveLoader: {
    modules: [NODE_MODULES, CWD_NODE_MODULES]
  },
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
      {
          test: /\.jsx?$/,
          enforce: "pre",
          use: [
            {loader: 'source-map-loader'}
          ]
      },
      {
        test: /\.html$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.s?css$/, // alternative *** : ^(?:(?:[^\.\s]+\.)(?!module))+s?css$
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
          {loader: 'sass-loader'},
        ]
      },
      {
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
          {loader: 'sass-loader'},
        ]
      },
      {
        test: /\.jsx?$/,
        include: [SRC, TESTS],
        exclude: /(node_modules|bower_components)/,
        use: [
          {loader: 'react-hot-loader'},
          {loader: loader('babel')},
        ]
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff'
        }
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: '10000',
          mimetype: 'application/octet-stream'
        }
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: '10000',
          mimetype: 'image/svg+xml'
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8192
        }
      },
      {
        test: /\.ico(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader'
      }
    ]
  }
};
