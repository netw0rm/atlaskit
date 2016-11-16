const path = require('path');

const iconNameToComponentName = require('../bin/iconNameToComponentName');
const { tmpFolderName } = require('./constants');


module.exports = ({
  iconName,
  svgData,
  unprefixedIconName,
  iconRelativePathToSrc,
}) => {
  const componentName = iconNameToComponentName(unprefixedIconName);

  const srcPath = path.join(__dirname, '..', 'src');
  const currentJsPath = path.join(srcPath, tmpFolderName, path.dirname(iconRelativePathToSrc));
  const relativePathToSrc = path.relative(currentJsPath, srcPath);

  /* eslint-disable max-len */
  return `
/** @jsx vdom */

import { define, vdom } from 'skatejs';
import Icon from '${relativePathToSrc}/Icon';

class ${componentName} extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      delete props.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (${svgData});
    };
  }
}

export default define('${iconName}', ${componentName});
`;
/* eslint-enable max-len */
};
