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
- Tests and coverage with Karma, Mocha, Sinon, Chai, and Enzyme

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

## Important info about browser globals

When developing and running your module and with `npm run start` you will be able to access the globals presents in the 'babel-polyfill' and 'whatwg-fetch' npm modules (e.g Array.prototype.includes, window.fetch).
When you are distributing your UMD with `npm run build` the UMD will not contains 'babel-polyfill' and 'whatwg-fetch', so if you used any of these globals in your UMD code the environment where the UMD is running must provide them.

We want polyfills to be be globals at the moment but this issue may be fixed in a future version of scv through:
https://github.com/qubyte/fetch-ponyfill
http://babeljs.io/docs/plugins/transform-runtime/

