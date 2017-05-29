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

  // Icon component will provide label, role and class props
  // SVG expecting title for title and iconProps to be spreaded across root tag.
  return `
  import React from 'react';
  import { iconConstructor, prepareProps } from '${relativePathToSrc}/lib/Icon';
  export const ${componentName}Icon = (props) => { 
    const { title, iconProps } = prepareProps(props); return (${svgData}) 
  };
  export default iconConstructor('${componentName}', ${componentName}Icon);
`;
};
