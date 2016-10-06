#!/usr/bin/env node
const fs = require('fs');
const minilog = require('minilog');
const HipChatNotifier = require('hipchat-msg').HipChatNotifier;


const log = minilog('release/announce');
minilog.enable();

const RELEASED_PACKAGES_FILE = '.released-packages';

const {
  HIPCHAT_DESIGN_PLATFORM_AUTH_TOKEN: AUTH_TOKEN,
  HIPCHAT_DESIGN_PLATFORM_ROOM_ID: ROOM_ID,
  CDN_URL_SCOPE,
  CDN_URL_BASE,
  BITBUCKET_REPO_OWNER: REPO_OWNER,
  BITBUCKET_REPO_SLUG: REPO_SLUG,
  BITBUCKET_COMMIT: COMMIT,
  BITBUCKET_BRANCH: BRANCH,
} = process.env;

if (!AUTH_TOKEN || !ROOM_ID || !CDN_URL_SCOPE || !CDN_URL_BASE) {
  log.error('env variables missing!');
  process.exit(1);
}


/**
* Generates a URL to a package in the registry, such as:
* http://aui-cdn.atlassian.com/atlaskit/registry/ak-avatar/2.3.1/
*
* @param {String} pkg The package name
* @param {String} version The package version
* @return {String} the URL to the package with the given version in the registry
*/
function generatePackageUrl(pkg, version) {
  return `${CDN_URL_BASE}/${CDN_URL_SCOPE}/registry/${pkg}/${version}/`;
}

let releasesFileContents = '';

if (fs.existsSync(RELEASED_PACKAGES_FILE)) {
  releasesFileContents = fs.readFileSync(RELEASED_PACKAGES_FILE, { encoding: 'utf8' });
}

if (releasesFileContents.trim() === '') {
  log.info('No release happened, no need to bug the AtlasKit guys :)');
  process.exit(0);
}

/* The packages file has the following format:
ak-avatar@0.12.5
ak-inline-dialog@62.0.0
ak-layer@50.0.0
akutil-component-template@3.0.11
akutil-cucumber@0.0.0
akutil-polyfills@0.0.9
akutil-shared-styles@33.0.0
eslint-config-ak-base@1.1.2
*/
const changedPackages = releasesFileContents
                          .split('\n')
                          .map((line) => line.split('@'));

const buildLink = `https://bitbucket.org/${REPO_OWNER}/${REPO_SLUG}/commits/${COMMIT}?at=${BRANCH}`;
const message = `
Commit <a href="${buildLink}">${COMMIT}</a> gave us some fresh components:<br/>
<table>
  <tr>
    <th>Component</th>
    <th>Version</th>
  </tr>
${changedPackages.map(([name, version]) => `
  <tr>
    <td><a href="${generatePackageUrl(name, version)}">${name}</a></td>
    <td>${version}</td>
  </tr>`).join('')}
</table>`;

try {
  const client = new HipChatNotifier({
    room: ROOM_ID,
    auth_token: AUTH_TOKEN,
  });

  client.message(message, {
    color: 'green',
  });
  log.info('Successfully notified of the new releases');
} catch (e) {
  log.error(e.message);
  process.exit(1);
}
