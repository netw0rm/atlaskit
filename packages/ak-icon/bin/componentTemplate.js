const path = require('path');

const iconNameToComponentName = require('../bin/iconNameToComponentName');
const { tmpFolderName } = require('./constants');

module.exports = ({
  svgData,
  unprefixedIconName,
  iconRelativePathToSrc,
}) => {
  const componentName = iconNameToComponentName(unprefixedIconName);

  const srcPath = path.join(__dirname, '..', 'src');
  const currentJsPath = path.join(srcPath, tmpFolderName, path.dirname(iconRelativePathToSrc));
  const relativePathToSrc = path.relative(currentJsPath, srcPath);

  /* eslint-disable max-len */
  return `import React from 'react';
import Icon from '${relativePathToSrc}/Icon';

export default class extends Icon {
  static displayName = ${JSON.stringify(componentName)};
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (${svgData});
    };
  }
}
`;
/* eslint-enable max-len */
};
