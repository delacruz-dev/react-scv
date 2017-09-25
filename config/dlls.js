//todo NOTE: do not include react-hot-loader in the dlls https://github.com/gaearon/react-hot-loader/issues/627

let dllModules = [
  'react',
  'react-addons-test-utils',
  'react-dom', 'query-string',
  'babel-polyfill',
  'whatwg-fetch',
  'querystring-es3',
  'ansi-html',
  'html-entities',
  'punycode',
  'events'
];

module.exports = dllModules;
