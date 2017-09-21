'use strict';

const core = require('./webpack.core');
const merge = require('webpack-merge');
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const CWD = process.cwd();
const BUILD = path.join(CWD, 'build/app');

//todo NOTE: do not include react-hot-loader in the dll https://github.com/gaearon/react-hot-loader/issues/627
let dllModules = getOnlyInstalledModules(['cookies-js', 'mixpanel-browser', 'moment', 'query-string', 'react', 'react-addons-test-utils', 'react-datetime', 'react-dom', 'react-router', 'validator',
    'babel-polyfill', 'whatwg-fetch', 'sockjs-client', 'querystring-es3', 'ansi-html', 'html-entities', 'punycode', 'events']);

function getOnlyInstalledModules (modules) {
    let result = [];
    modules.forEach((module) => {
        const moduleFolderPath = path.join(process.cwd(), path.join('node_modules', module));
        if (fs.existsSync(moduleFolderPath)) {
            result.push(module);
        }
    });
    return result;
}

const config = merge(core, {
    entry: {
        'app': dllModules.concat([
            'lodash/cloneDeep', 'lodash/merge', 'lodash/isEqual'
        ]),
    },
    output: {
        filename: '[name]-dll.js',
        path: BUILD,
        library: '[name]_dll',
    },
    plugins: [
        new webpack.DllPlugin({
            // The path to the manifest file which maps between
            // modules included in a bundle and the internal IDs
            // within that bundle
            path: BUILD + '/[name]-dll-manifest.json',
            // The name of the global variable which the library's
            // require function has been assigned to. This must match the
            // output.library option above
            name: '[name]_dll'
        })
    ],
});

module.exports = config;
