module.exports = packages =>
  packages
    .replace(/[{}]/g, '')
    .replace(/@atlaskit\//g, '')
    .split(',');
