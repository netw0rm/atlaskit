/**
 * This is the template for an auto-generated icon component.
 */
module.exports = (svg, displayName) => `import React from 'react';
import Icon from '@atlaskit/icon';

const Svg = ({ title, ...svgProps }) => {
  return <span {...svgProps} dangerouslySetInnerHTML={{__html: '${svg}'}} />;
}
const ${displayName} = props => (<Icon glyph={Svg} {...props} />);
export default ${displayName};
`;
