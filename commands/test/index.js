'use strict';

const overrides = require('../../src/overrides');
const path = require('path');
const CONFIG_FILE_PATH = overrides.filePath(path.join(__dirname, '../../config/jest.js'));
const jest = require('jest');

module.exports = (args, done) => {

  process.on('SIGINT', done);

  let processArgs = process.argv.splice(1);

  processArgs = addConfigArgIfNotPresent(processArgs);

  const argsString = stringify(processArgs);

  console.log('running: jest ' + argsString)

  jest.run(argsString, process.cwd());

}

function addConfigArgIfNotPresent (processArgs) {
  if (!isConfigArgPresent(processArgs)) {
    return processArgs.concat(['--config=' + CONFIG_FILE_PATH]);
  }
  return processArgs;
}

function isConfigArgPresent (processArgs) {
  return processArgs.findIndex(isConfigArg) !== -1;
}

const isConfigArg = (e) => e.indexOf('--config') !== -1;

function stringify (argv) {
  return argv.reduce((acc, e) => {
    return acc + e + ' ';
  }, '');
}
