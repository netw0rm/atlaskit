#!/usr/bin/env node

const path = require('path');
const { tmpFolderName } = require('./constants');
const fileToScope = require('./fileToScope');
const getAllIconsPaths = require('./getAllIconsPaths');
const pathToDashed = require('./pathToDashed');

const bytebucketIconPath = 'https://bytebucket.org/atlassian/atlaskit/raw/@BITBUCKET_COMMIT@/packages/ak-icon';
const tmpFolder = `${path.join('..', 'src', tmpFolderName)}${path.sep}`;
const allIconPaths = getAllIconsPaths();

const svgUrl = iconScope => `${bytebucketIconPath}/src/icons/${iconScope}.svg`;
const mardownImg = iconScope => `!["${iconScope}"](${svgUrl(iconScope)} "${iconScope}")`;
const importCode = iconScope => `\`import 'ak-icon/glyph/${iconScope}';\``;
const webcomponentCode = iconScope => `\`<ak-icon-${pathToDashed(iconScope)} />\``;
const tableRow = iconScope => `|${mardownImg(iconScope)}|${importCode(iconScope)}|${webcomponentCode(iconScope)}|`; // eslint-disable-line  max-len

/* eslint-disable  no-console */
// output the Icons header information
console.log('## Icons');
console.log('These are the icons that are currently bundled in `ak-icon`.');
console.log('');

// now output the icon tableRow
console.log('|Icon|Import|Webcomponent|');
console.log('|----|------|------------|');
allIconPaths.forEach((iconPath) => {
  // convert from path in `../src/tmp/bitbucket/projects.js` form to `bitbucket/projects` form
  const iconScope = fileToScope(iconPath, tmpFolder);
  console.log(tableRow(iconScope));
});
/* eslint-enable  no-console */
