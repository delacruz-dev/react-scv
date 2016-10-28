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
- Tests and coverage with Karma, Mocha, Chai, and Enzyme

## Requirements

- Node.js v4+ and npm

## Initialize empty project

#### Global

```bash
npm install -g scv
mkdir <project-name> && cd <project-name>
scv init # and follow the prompts
```

#### Local

```bash
mkdir -p <project-name>/node_modules && cd <project-name>
npm install workshare-scv
node_modules/.bin/scv init # and follow the prompts
```

##### Sample output

```bash
→ create package.json
→ create src/
→ create tests/
→ create .gitignore
→ create LICENSE
→ create README.md
```

## Install in existing project

```bash
npm install --save-dev workshare-scv
```

## Workflow

- Add code to `src/` and tests to `tests/`.
- Build and watch changes in `src/` with `npm run start`.
- Lint and build the project as an UMD with `npm run build`.
- Run tests with `npm test`.

## Important info about browser globals

When developing and running your module and with `npm run start` you will be able to access the globals presents in the 'babel-polyfill' and 'whatwg-fetch' npm modules (e.g Array.prototype.includes, window.fetch).
When you are distributing your UMD with `npm run build` the UMD will not contains 'babel-polyfill' and 'whatwg-fetch', so if you used any of these globals in your UMD code the environment where the UMD is running must provide them.

We want polyfills to be be globals at the moment but this issue may be fixed in a future version of scv through:
https://github.com/qubyte/fetch-ponyfill
http://babeljs.io/docs/plugins/transform-runtime/

