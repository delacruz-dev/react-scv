<p align="center">
  <img src="scv.jpeg" height="96" />
</p>

<p align="center">Create React modules with zero configuration needed.</p>

## What is it about?

This library allows you to create React modules with no configuration needed.

## What do you mean with "React modules"

We mean a project that:

- Is a React "web application" that can be served statically on a server.
- Is also a "library" that can be imported by other projects as an npm dependency.

## How to create a new project?

```bash
mkdir -p <project-name>/node_modules && cd <project-name>
npm install workshare/scv
node_modules/.bin/scv init # and follow the prompts
```

## What features I get for free in my project?

- React
- Webpack
- Webpack DLL
- Webpack API proxy (you need to tell what to proxy though)
- react-hot-loader 3.0
- Babel, ES2015 + modules, Stage 0 preset
- Tests and coverage with Jest
- Enzyme
- CSS modules
- ESLint

## How to work with the created project?

- Serve your "web application" on a devServer with hot-reload using `npm run start`, the entry point of your "web application" is `src/app.js`.
- Add as much code as you want in `src/` and `tests/`.
- Run tests with `npm run test`.
- Do some ES6 export in `src/module/index.js` to make the exported objects available to the users of your "library".
- Distribute both the "web application" and the "library" with `npm run build`.

## What if I don't care about the "web application" part of the build?

You can delete the file `src/app.js` and forget about it, you will only get the UMD part when running `npm run build`

## What if I don't care about the "library" part of the build?

You can delete the file `src/module/index.js` and forget about it, you will only get the "React web application" part when running `npm run build`

## Info about the build result

Running `npm run build` will produce

- A folder `build/app` containing your web application, serve the content of this folder on any web server and enjoy
- A folder `build/umd` containing the transpiled code of your library

## Info about your project content

If it wasn't clear yet

- `src/app.js` is used as entry point to serve and build your project as a "web application", contents not included in this file will not be served by `npm run start` and will not be built by `npm run build`.
- `src/module/index.js` is used as entry point for the "library" produced by `npm run build`, contents not included in this file will not be part of the "library".

Delete one of this two files if you are not interested in its build result.

Is important to notice that your project doesn't contain any configuration file, all the needed configuration files are inside the workshare-scv dependency.

## (Optional) Configuration... If you want it so bad

A subset of the module features can be configured directly through the `scv` section in the package.json

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
"scv": {
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

## Info about browser globals

When developing and running your module and with `npm run start` you will be able to access the globals presents in the 'babel-polyfill' and 'whatwg-fetch' npm modules (e.g Array.prototype.includes, window.fetch).
When you are distributing your UMD with `npm run build` the UMD will not contains 'babel-polyfill' and 'whatwg-fetch', so if you used any of these globals in your UMD code the environment where the UMD is running must provide them.

## Extra info

This project is a workshare customization/extension of [`mozilla-neo`](https://github.com/mozilla/neo/)
