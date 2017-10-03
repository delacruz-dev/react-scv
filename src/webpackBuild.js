const webpack = require('webpack');

module.exports = function webpackBuild (config) {

  return new Promise((resolve, reject) => {

    webpack(config, (err, stats) => {
      if (err || stats.hasErrors()) {
        if (err) {
          console.error(err.stack || err);
          if (err.details) {
            console.error(err.details);
          }
        } else if (stats.hasErrors()) {
          console.log(stats.toString({colors: true}));
        }
        reject();
      } else {
        console.log(stats.toString({colors: true}));
        setTimeout(() => { //because apparently some webpack plugin might schedule some async work
          resolve();
        }, 0);
      }
    });

  });

}
