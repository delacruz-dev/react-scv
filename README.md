<p align="center">
  <img src="scv.jpeg" height="96" />
</p>

<p align="center">Create React modules with zero configuration needed</p>

## What is it about?

This library allows you to create "React modules" with zero configuration needed.

## What do you mean with "React modules"?

We mean a project that:

- Is a React "web application" that can be served statically on a server.
- Is also a "library" that can be imported by other projects as an npm dependency.

## How to create a new project?

```bash
mkdir -p <project-name>/node_modules && cd <project-name>
npm install marcellomontemagno/react-scv
node_modules/.bin/react-scv init # and follow the prompts
```

Is important to notice that your new project doesn't contain any configuration file, it just works.

## What features I get for free in my new project?

- React
- Webpack
- Webpack DLLs
- Webpack proxy (you need to tell what to proxy though)
- react-hot-loader 3.0
- Babel with ES2015, Stage 0 and React presets
- Tests and coverage with Jest
- Enzyme
- CSS modules
- ESLint

## How to work with my new project?

- Serve your web application on a devServer with hot-reload using `npm run start`, the entry point of your web application is `src/app.js`.
- Add your code in `src/` and `tests/`.
- Run your tests with `npm run test`.
- Do some ES6 exports in `src/module/index.js` to make the exported objects available to the users of your library.
- Distribute both the web application and the library running `npm run build`.

## Info about the build result

Running `npm run build` will produce

- A folder `build/app` containing your web application. Serve the content of this folder on a web server and enjoy your app in production.
- A folder `build/umd` containing the transpiled code of your library.

## What if I don't care about the web application part of the build?

You can delete the file `src/app.js` and forget about it, from now on, you will only get the UMD part when running `npm run build`

## What if I don't care about the library part of the build?

You can delete the file `src/module/index.js` and forget about it, from now on, you will only get the "React web application" part when running `npm run build`

## Info about your new project contents

- `src/app.js` is used as entry point to serve and build your project as a web application, contents not included in this file will not be served by `npm run start` and will not be built by `npm run build`.
- `src/module/index.js` is used as entry point for the library produced by `npm run build`, contents not included in this file will not be part of the library.

The rest of the project should be self explanatory.

## Optional - Configuration, some basic stuff

A subset of the module features can be configured directly through the `react-scv` section in the package.json:

```javascript
"react-scv": {
  "appBuildEntry": "src/app.js", //the entry point of your web application
  "umdBuildEntry": "src/module/index.js", //the entry point of your library
  "html": { //doc here: https://github.com/jantimon/html-webpack-plugin#configuration
    "title": "risk-analytics-ui",
    "description": "components for risk analytics"
  },
  "devServer":{
    "port": "4000",
    "proxy": { //doc here: https://webpack.github.io/docs/webpack-dev-server.html#proxy
      "/api": { //proxies the api call to the /api path (useful to avoid CORS during development)
        "target": "https://anIP/aContextPath",
        "changeOrigin": true,
        "secure": false,
        "logLevel": "debug"
      }
    }
  }
}
```

## Optional - Customize react-scv in your project (if you want that extra feature so bad)

We try to give you complete freedom over what you can customize, all the configuration files used by react-scv are at this path [`here`](https://github.com/marcellomontemagno/react-scv/tree/master/config) before customizing something please take your time to have a look on what is there.

The following files can be overridden creating a file with the same name in your project under the `react-scv` folder:

- `webpack.app.js` //used to build your web application during `build`
- `webpack.dev.js` //used to serve your application during `start`
- `webpack.umd.js` //used to build your library UMD during `build`
- `dlls.js` //the npm dependencies that will be included in the webpack DLLs during `build` and `start`
- `eslint.dev.js` //used to lint the code during `start`
- `eslint.prod.js` //used to lint the code during `build`
- `jest.js` //used to run the tests during `test`

here an example of how to add a new plugin (`webpack-visualizer-plugin`) to the build configuration for the web application:

    - create a folder named `react-scv` in the root of your project
    - add a file named `webpack.app.js` in the `react-scv` folder
    - insert the following content inside the new `webpack.app.js`

```javascript
let config = require('react-scv/config/webpack.app'); //retrieve the original webpack configuration object form react-scv
const WebpackVisualizerPlugin = require('webpack-visualizer-plugin');

config.plugins.push(new WebpackVisualizerPlugin()); //modifies the webpack configuration object where needed

module.exports = config;
```

The same mechanism can be used to customize the other listed files.

IMPORTANT - When overriding something please keep in mind that

- you have to pay attention, we give you full freedom on what you can change, you are basically changing the react-scv code, this means, you might break something
- don't go crazy, you will need to maintain your customizations, migrating to a future version of react-scv might be difficult if you add too many features
- if you think <<oh maaaan, that extra feature I just added is sooo gooood>> you might help react-scv to include it in its the next release with a pull request instead of having a customization in your project 😊

## Info about browser globals and your UMD

When developing and running your module and with `npm run start` you will be able to access the globals presents in the 'babel-polyfill' and 'whatwg-fetch' npm modules (e.g window.fetch).
When you are distributing your UMD with `npm run build` the UMD will not contains 'babel-polyfill' and 'whatwg-fetch', so if you used any of these globals in your UMD code the environment where the UMD is running must provide them.
