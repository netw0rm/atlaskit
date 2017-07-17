const fs = require('fs');

const updateChangelog = ('./updateChangelog');

const getCurrentChangelog = (pathName, dirPath, packageName) => {
  let currentChangelog;
  try {
    currentChangelog = fs.readFileSync(pathName).toString();
  } catch (e) {
    try {
      fs.readdirSync(dirPath);
    } catch (er) {
      fs.mkdirSync(dirPath);
    }
    currentChangelog = `# ${packageName}\n\n## Unreleased\n\n`;
  }
  return currentChangelog;
};

const rewriteChangelog = (pathName, changeLogEntry, dirPath, packageName) => {
  const currentChangelog = getCurrentChangelog(pathName, dirPath, packageName);
  const updatedChangelog = updateChangelog(currentChangelog, changeLogEntry, pathName);

  return new Promise((resolve, reject) => {
    fs.writeFile(pathName, updatedChangelog, (err) => {
      if (err) return reject(err);
      return resolve();
    });
  });
  // Find Unreleased or add it
  // Add text as dot point to at the top of unreleased notes OR make new dotpoint
  // at the top of notes
};

module.exports = rewriteChangelog;
