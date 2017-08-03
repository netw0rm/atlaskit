const getNextVersion = (currentVersion, releaseType) => {
  const versionInfo = currentVersion.split(/(\d+)\.(\d+)\.(\d+)/);
  if (versionInfo.length === 1) return null;
  const versionObj = {
    major: parseInt(versionInfo[1], 10),
    minor: parseInt(versionInfo[2], 10),
    patch: parseInt(versionInfo[3], 10),
  };
  if (releaseType === 'patch') return `${versionObj.major}.${versionObj.minor}.${versionObj.patch + 1}`;
  if (releaseType === 'minor') return `${versionObj.major}.${versionObj.minor + 1}.0`;
  if (releaseType === 'major') return `${versionObj.major + 1}.0.0`;
  return null;
};

module.exports = getNextVersion;
