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

const loader = name => `${name}?${qs.stringify(require(`.\/${name}`), {
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
    new DefinePlugin(ENV)
  ],
  resolve: {
    root: [NODE_MODULES, CWD_NODE_MODULES],
    extensions: ['', '.js', '.jsx', '.json'],
      alias: {
        'react/lib/ReactMount': 'react-dom/lib/ReactMount' //TODO needed to make react 15.4.2 work with the 1.X hot reloader, update hot realoder when the 3.0 is stable
      }
  },
  resolveLoader: {
    root: [NODE_MODULES, CWD_NODE_MODULES]
  },
  eslint: {
    configFile: path.join(__dirname, 'eslint.core.js'),
    useEslintrc: false
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        include: [SRC],
        loader: 'eslint'
      },
      {
        test: /\.jsx?$/,
        loaders: ['source-map-loader']
      }
    ],
    loaders: [
      {
        test: /\.html$/,
        loader: 'file',
        query: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.(css|scss)$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.jsx?$/,
        include: [SRC, TESTS],
        exclude: /(node_modules|bower_components)/,
        loaders: ['react-hot', loader('babel')]
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          mimetype: 'application/font-woff'
        }
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url',
        query: {
          limit: '10000',
          mimetype: 'application/octet-stream'
        }
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url',
        query: {
          limit: '10000',
          mimetype: 'application/svg+xml'
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'url',
        query: {
          limit: 8192
        }
      },
      {
        test: /\.ico(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url'
      }
    ]
  }
};
