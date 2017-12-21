const axios = require('axios');
const semver = require('semver');

function getNpmMetadata(name) {
  const url = `http://registry.npmjs.org/${name.replace('/', '%2F')}`;
  return axios.get(url)
    .then(({ data }) => ({
      currentVersion: semver.maxSatisfying(Object.keys(data.versions), '*'),
      description: data.description,
      isPublished: true,
      maintainers: data.maintainers,
      publishedOn: data.time[semver.maxSatisfying(Object.keys(data.versions), '*')],
      versions: Object.keys(data.versions),
    }))
    .catch((error) => {
      if (!error || !error.response || error.response.status !== 404) {
        throw error;
      }

      return {
        isPublished: false,
        versions: [],
      };
    });
}

function getStorybooksMetadata(name, versions) {
  function storybookValid(version) {
    const url = `https://s3.ap-southeast-2.amazonaws.com/atlaskit-storybooks/${name}/${version}/index.html`;

    return axios.get(url)
      .then(() => ({ version, valid: true }))
      .catch(() => ({ version, valid: false }));
  }

  return Promise.all(versions.map(storybookValid))
    .then(storybooks => ({
      validVersions: storybooks.filter(x => x.valid).map(x => x.version),
    })
  );
}

function getExternalMetadata(name) {
  const npm = getNpmMetadata(name);
  const storybook = npm.then(({ versions }) => getStorybooksMetadata(name, versions));
  return Promise.all([npm, storybook])
    .then(([npmMetadata, storybookMetadata]) => ({
      currentVersion: npmMetadata.currentVersion,
      description: npmMetadata.description,
      maintainers: npmMetadata.maintainers,
      versions: npmMetadata.versions,
      storybooks: storybookMetadata.validVersions,
      isPublished: npmMetadata.versions.length > 0,
      lastPublishedOn: npmMetadata.publishedOn,
    }));
}

module.exports = getExternalMetadata;
