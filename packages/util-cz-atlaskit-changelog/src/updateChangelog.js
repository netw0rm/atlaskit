const updateChangelog = (currentChangelog, changeLogEntry, pathName) => {
  const unreleasedSectionMarker = /(## Unreleased\n\n)/;
  const readmeTitleMarker = /^(# .+?\n\n)/;
  if (unreleasedSectionMarker.test(currentChangelog)) {
    return currentChangelog.replace(unreleasedSectionMarker, `$1${changeLogEntry}`);
  } else if (readmeTitleMarker.test(currentChangelog)) {
    // we need to add an unreleased section
    return currentChangelog.replace(readmeTitleMarker, `$1## Unreleased\n\n${changeLogEntry}\n`);
  }
  return Promise.reject(`Unable to find an unreleased section or Header in changelog ${pathName}`);
};

module.exports = updateChangelog;
