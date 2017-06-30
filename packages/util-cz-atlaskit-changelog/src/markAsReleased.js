const fs = require('fs');

const markPackageForRelease = (pkgName, cb) => {
  if (!pkgName) return cb({ error: 'No package provided to update' });
  const packagePath = `../../${pkgName}/package.json`;
  const changelogPath = `../../${pkgName}/docs/CHANGELOG.md`;
  // eslint-disable-next-line
  const version = require(packagePath).version;
  const currentChangelog = fs.readFileSync(changelogPath).toString();

  const divided = currentChangelog.split('## Unreleased');
  let newChangelogContent;
  if (divided.length === 2) {
    newChangelogContent = divided.join(`## Unreleased\n\n## ${version} (${new Date().toISOString().slice(0, 10)})`);
  } else {
    newChangelogContent = currentChangelog;
  }

  return fs.writeFile(changelogPath, newChangelogContent, (err) => {
    cb(err);
  });
};

module.exports = markPackageForRelease;
