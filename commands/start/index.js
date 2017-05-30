'use strict';

const DevServer = require('webpack-dev-server');
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

module.exports = (args, done) => {

  buildDllIfNotPresent(()=>{

      const port = args.options.port;
      const config = args.options.config ?
          require(path.resolve(process.cwd(), args.options.config)) :
          require('../../config/webpack.dev');

      const schema = config.devServer.https ? 'https' : 'http';
      const host = config.devServer.host || 'localhost';

      config.entry.unshift(
          `webpack-dev-server/client?${schema}://${host}:${port}`,
          'webpack/hot/dev-server'
      );

      console.log('starting dev server, and api proxy');

      const compiler = webpack(config);
      const server = new DevServer(compiler, config.devServer);

      server.listen(port, host, () => console.log(`Listening on ${schema}://${host}:${port}`));

      process.on('SIGINT', ()=>{server.close(); done()});

  });

};

function buildDllIfNotPresent(cb){

    console.log('checking dll existence');

    if (!fs.existsSync(path.join(process.cwd(), 'build/dev-dll-manifest.json'))) {

        console.log('dll not found, building dll');

        webpack(require('../../config/webpack.dll'), (err, stats) => {

            if (!err) {
                console.log(stats.toString({colors: true}));
            } else {
                console.error(err.stack || err);

                if (err.details) {
                    console.error(err.details);
                }
            }

            cb();

        });

    }else{
        console.log('dll found, update your dll for better performance if needed');
        cb();
    }

}
