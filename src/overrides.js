const CWD = process.cwd();
const path = require('path');
const fs = require('fs');

module.exports = {

  require: function (file) {
    const userProjectOverridesPath = path.join(CWD, 'react-scv');
    const override = path.join(userProjectOverridesPath, path.basename(file));
    return moduleExists(override) ? require(override) : require(file);
  },

  filePath: function (filePath) {
    const userProjectOverridesPath = path.join(CWD, 'react-scv');
    const overridePath = path.join(userProjectOverridesPath, path.basename(filePath));
    return fs.existsSync(overridePath) ? overridePath : filePath;
  }

}

function moduleExists (name) {
  try {
    require.resolve(name);
  } catch (e) {
    return false
  }
  return true
}

