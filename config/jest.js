const path = require('path');
const CWD = process.cwd();
const CWD_NODE_MODULES = path.join(CWD, 'node_modules');
const NODE_MODULES = path.join(__dirname, '../node_modules');
const JEST_BABEL_TRANSFORMER = path.join(__dirname, '../utils/jestBabelTransformer.js');
const JEST_STYLE_MOCK = path.join(__dirname, '../utils/styleMock.js');
const JEST_FILE_MOCK = path.join(__dirname, '../utils/fileMock.js');
const ENZYME_SETUP = path.join(__dirname, 'enzyme.js');
const RAF_POLYFILL = require.resolve('raf/polyfill');
const ROOT = path.join(CWD, 'tests');
const SOURCES = path.join(CWD, 'src');

module.exports = {    
  collectCoverageFrom: ["src/**/*.js", "!**/node_modules/**", "!**/vendor/**"],
  moduleDirectories: [CWD_NODE_MODULES, NODE_MODULES],
  moduleNameMapper: {
  rootDir: ROOT,
  roots: [SOURCES, ROOT],
  setupFiles: [RAF_POLYFILL, ENZYME_SETUP],
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)(spec|test).js?(x)', '**/*+(_spec|_test).js?(x)'],
  transform: {".*": JEST_BABEL_TRANSFORMER},
    "\\.(css|less|scss)$": JEST_STYLE_MOCK,
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": JEST_FILE_MOCK,
    "\\.(cssm|scssm)$": "identity-obj-proxy"
  },
  verbose: true
}
