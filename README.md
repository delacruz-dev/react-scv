<p align="center">
  <img src="scv.jpeg" height="96" />
</p>


<p align="center">Create and build React UMD with zero initial configuration and minimal fuss.</p>

## Before you start

This project is a workshare customization of [`mozilla-neo`](https://github.com/mozilla/neo/) for any additional information you can check the [`mozilla-neo`](https://github.com/mozilla/neo/) repo

## Features

- React
- Webpack
- ESLint, Babel, ES2015 + modules, Stage 0 preset
- Tests and coverage Jest
- CSS modules
- FLow

## Requirements

- Node.js v4+ and npm

## Initialize empty project

#### Global

```bash
npm install -g workshare/scv
mkdir <project-name> && cd <project-name>
scv init # and follow the prompts
```

#### Local

```bash
mkdir -p <project-name>/node_modules && cd <project-name>
npm install workshare/scv
node_modules/.bin/scv init # and follow the prompts
```

##### Sample output

```bash
→ create package.json
→ create src/app.js
→ create src/module/Component.js
→ create src/module/index.js
→ create tests/module/Component_test.js
→ create .gitignore
→ create LICENSE
→ create README.md
```

## Install in existing project

```bash
npm install --save-dev workshare/scv
```

## Workflow

- Serve your module as a webapp with livereload using `npm run start`, the entry point of the webapp is `src/app.js`.
- Add code to `src/` and tests to `tests/`.
- Run tests with `npm test`.
- Lint and build the project as an UMD with `npm run build`.

## Info about the module content

by default:

- `src/app.js` is used as entry point to serve the module as a webapp, contents not included here will not be served by `npm run start`.
- `src/module/index.js` is used as entry point for the UMD produced by `npm run build`, contents not included here will not become part of the distributed UMD.
- any file matching this pattern `tests/*/*_test.js` will be executed as a test when running `npm run test`.

some of these default can be changed in the config section of the package.json

## Configuration

A subset of the module features can be configured directly through the `config` section in the package.json

here's the config section default content

```
"config": {
  "appBuildEntry": "src/app.js",
  "umdBuildEntry": "src/module/index.js"
}
```

- appBuildEntry is the path of the entry point used by the webpack dev server when running `npm run start`
- umdBuildEntry is the path of the entry point used by the webpack UMD build when running `npm run build`

Another feature that can be configured from this section is a proxy for the http calls while the module is running through `npm run start`.
Setting up a proxy during development could be useful for example to avoid CORS when contacting a server deployed on a different host and/or port.

Following an example configuration for the proxy

```
"config": {
  "proxy": {
    "/api": {
      "target": "https://10.30.3.52/my-backend",
      "secure": false,
      "logLevel": "debug"
    }
  }
}
```

with this configuration all the http calls containing `/api` will be proxied to `https://10.30.3.52/my-backend`

e.g

`http://localhost:3000/api/license`

will result in

`https://10.30.3.52/my-backend/api/license`

invoked by the proxy.

Is important to notice that the proxy is only applied to the webpack dev server while running `npm run start`.

Additional info about the proxy configuration can be found [`here`](https://webpack.github.io/docs/webpack-dev-server.html#proxy)

## Important info about browser globals

When developing and running your module and with `npm run start` you will be able to access the globals presents in the 'babel-polyfill' and 'whatwg-fetch' npm modules (e.g Array.prototype.includes, window.fetch).
When you are distributing your UMD with `npm run build` the UMD will not contains 'babel-polyfill' and 'whatwg-fetch', so if you used any of these globals in your UMD code the environment where the UMD is running must provide them.

We want polyfills to be be globals at the moment but this issue may be fixed in a future version of scv through:
https://github.com/qubyte/fetch-ponyfill
http://babeljs.io/docs/plugins/transform-runtime/

