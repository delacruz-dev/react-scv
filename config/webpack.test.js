'use strict';

const core = require('./webpack.core');
const merge = require('webpack-merge');

// Webpack plugins can cause karma-webpack to behave badly with no good debug
// information. It's easier to just not use plugins when testing.
delete core.plugins;

module.exports = merge(core, {
  entry: function(){return {}},
  devtool: 'inline-source-map',
  // https://github.com/airbnb/enzyme/issues/47#issuecomment-207498885
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': 'window'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        exclude: /(node_modules|bower_components|tests)/,
        loader: 'isparta-instrumenter-loader',
        options: {
          babel: require('./babel')
        }
      }
    ]
  }
});
