const axios = require('axios');

function getNpmMetada(name) {
  const url = `http://registry.npmjs.org/${name.replace('/', '%2F')}`;
  return axios.get(url)
    .then(response => response.data)
    .then(({ versions, time }) => ({
      versions: Object.keys(versions),
      publishedOn: time.modified,
    }));
}

function getStorybooksMetadata(name, versions) {
  function storybookValid(version) {
    const url = `https://aui-cdn.atlassian.com/atlaskit/stories/${name}/${version}/`;

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
  const npm = getNpmMetada(name);
  const storybook = npm.then(({ versions }) => getStorybooksMetadata(name, versions));
  return Promise.all([npm, storybook])
    .then(([npmMetadata, storybookMetadata]) => ({
      versions: npmMetadata.versions,
      storybooks: storybookMetadata.validVersions,
      lastPublishedOn: npmMetadata.publishedOn,
    }));
}

module.exports = getExternalMetadata;
