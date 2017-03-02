const path = require('path');

const iconNameToComponentName = require('../bin/iconNameToComponentName');
const { tmpFolderName } = require('./constants');

module.exports = ({
  svgData,
  unprefixedIconName,
  iconRelativePathToSrc,
}) => {
  const componentName = iconNameToComponentName(unprefixedIconName);

  const srcPath = path.join(__dirname, '..', 'tmp');
  const currentJsPath = path.join(srcPath, tmpFolderName, path.dirname(iconRelativePathToSrc));
  const relativePathToSrc = path.relative(currentJsPath, srcPath);

  /* eslint-disable max-len */
  return `import { iconContructor } from '${relativePathToSrc}/lib/Icon';
  /* eslint-disable max-len */
export default iconContructor('${componentName}','${svgData}');
  /* eslint-enable max-len */
`;
  /* eslint-enable max-len */
};
