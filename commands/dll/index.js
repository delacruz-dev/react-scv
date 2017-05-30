'use strict';

const path = require('path');
const dllConfig = require('../../config/webpack.dll');
const webpack = require('webpack');

var fs = require('fs');

module.exports = (args, done) => {

    let config = args.options.config ?
        require(path.resolve(process.cwd(), args.options.config)) :
        dllConfig;

    webpack(config, (err, stats) => {

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
