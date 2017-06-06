const path = require('path');
const CWD = process.cwd();
const JEST_BABEL_TRANSFORMER = path.join(__dirname, '../utils/jestBabelTransformer.js');
const JEST_STYLE_MOCK = path.join(__dirname, '../utils/styleMock.js');
const JEST_FILE_MOCK = path.join(__dirname, '../utils/fileMock.js');
const ROOT = path.join(CWD, 'tests');

module.exports = {
    verbose: true,
    rootDir: ROOT,
    transform: {".*": JEST_BABEL_TRANSFORMER},
    collectCoverageFrom: ["src/**/*.js", "!**/node_modules/**", "!**/vendor/**"],
    testMatch: [ '**/__tests__/**/*.js?(x)', '**/?(*.)(spec|test).js?(x)', '**/*+(_spec|_test).js?(x)' ],
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": JEST_FILE_MOCK,
        "\\.(css|less|scss|cssm|scssm)$": JEST_STYLE_MOCK
    }
}
