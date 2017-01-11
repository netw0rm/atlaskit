const iconNameToComponentName = require('../bin/iconNameToComponentName');

module.exports = ({
  svgData,
  unprefixedIconName,
}) => {
  const componentName = iconNameToComponentName(unprefixedIconName);

  /* eslint-disable max-len */
  return `import React from 'react';
import Icon from 'ak-icon/lib/Icon';

class ${componentName} extends Icon {
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

export default ${componentName};
`;
  /* eslint-enable max-len */
};
