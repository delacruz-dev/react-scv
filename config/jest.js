const path = require('path');
const CWD = process.cwd();
const JEST_BABEL_TRANSFORMER = path.join(__dirname, '../utils/jestBabelTransformer.js');
const ROOT = path.join(CWD, 'tests');

module.exports = {
    verbose: true,
    rootDir: ROOT,
    transform: {".*": JEST_BABEL_TRANSFORMER},
    collectCoverageFrom: ["src/**/*.js", "!**/node_modules/**", "!**/vendor/**"],
    testMatch: [ '**/__tests__/**/*.js?(x)', '**/?(*.)(spec|test).js?(x)', '**/*+(_spec|_test).js?(x)' ]
}
