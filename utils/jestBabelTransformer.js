const babelConfigObj = require('../config/babel.js');

module.exports = require('babel-jest').createTransformer(babelConfigObj);
