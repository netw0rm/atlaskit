/**
 * This is the template for an auto-generated icon component.
 */
module.exports = (svg, displayName) => `import React from 'react';
import Icon from '@atlaskit/icon';

const ${displayName} = props => (<Icon glyph={\`${svg}\`} {...props} />);
export default ${displayName};
`;
