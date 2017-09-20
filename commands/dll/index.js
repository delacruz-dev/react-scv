'use strict';

const dllConfig = require('../../config/webpack.dll');
const webpack = require('webpack');

var fs = require('fs');

module.exports = (args, done) => {

  console.log(' --- building the dll --- ');

  webpack(dllConfig, (err, stats) => {

    if (!err) {
      console.log(stats.toString({colors: true}));
    } else {
      console.error(err.stack || err);

      if (err.details) {
        console.error(err.details);
      }
    }

    done();

  });

};
