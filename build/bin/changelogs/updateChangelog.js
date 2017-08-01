/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const modifyChangelog = require('./modifyChangelog');

const updateChangelog = ({ pkg, nextRelease, location }) => {
  const changelogPath = path.join(location, 'docs/CHANGELOG.md');

  let oldChangelog = '';
  try {
    oldChangelog = fs.readFileSync(changelogPath).toString();
  } catch (e) {
    console.log('No Changelog exists at', changelogPath);
    return null;
  }

  const newChangelog = modifyChangelog(pkg.version, nextRelease.type, oldChangelog);

  fs.writeFileSync(changelogPath, newChangelog);
  return newChangelog;
};

module.exports = updateChangelog;
