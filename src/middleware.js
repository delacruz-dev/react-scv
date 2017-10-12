const CWD = process.cwd();
const path = require('path');
const createCursors = require('cursorify').createCursors;

module.exports = {

  applyMiddleware: function (absFile) {
    let config = {};
    const cursors = createCursors();
    const scvMiddleware = require(absFile);
    const userMiddleware = requireOrPassThroughMiddleware(absFile);
    config = scvMiddleware(config, cursors);
    config = userMiddleware(config, cursors);
    return config
  },

}

function requireOrPassThroughMiddleware (absFile) {
  const userProjectOverridesPath = path.join(CWD, 'react-scv');
  const middleware = path.join(userProjectOverridesPath, path.basename(absFile));
  return moduleExists(middleware) ? require(middleware) : passThroughMiddleware;
}

const passThroughMiddleware = function (config) {
  return config
};

function moduleExists (name) {
  try {
    require.resolve(name);
  } catch (e) {
    return false
  }
  return true
}

