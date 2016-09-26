module.exports = (iconName, svgData, width, height) => `

import { define, vdom } from 'skatejs';

// eslint-disable-next-line max-len, react/jsx-space-before-closing
const Glyph = () => (${svgData});

export default define('${iconName}', {
  render() {
    return (
      <div style={{ display: 'flex', width: '${width}px', height: '${height}px' }}>
        <div style={{ margin: 'auto' }}>
          <Glyph />
        </div>
      </div>
    );
  },
});
`;
