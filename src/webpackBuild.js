const webpack = require('webpack');

module.exports = function webpackBuild (config, cb) {

  webpack(config, (err, stats) => {
    if (!err) {
      console.log(stats.toString({colors: true}));
    } else {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
    }
    setTimeout(cb, 0); //because apparently some webpack plugin might schedule some async work
  });

}
