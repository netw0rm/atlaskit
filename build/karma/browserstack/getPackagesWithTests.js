const glob = require('glob');
const createPattern = require('./createPattern');

module.exports = packages =>
  packages.filter(packageName =>
    glob.sync(createPattern([packageName])).length);
