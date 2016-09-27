const path = require('path');
const iconNameToComponentName = require('../src/iconNameToComponentName');

module.exports = ({ iconName, svgData, unprefixedIconName, iconRelativePathToSrc }) => {
  const componentName = iconNameToComponentName(unprefixedIconName);

  const currentJsPath = path.join(__dirname, '..', 'tmp', path.dirname(iconRelativePathToSrc));
  const srcPath = path.join(__dirname, '..', 'src');
  const relativePathToSrc = path.relative(currentJsPath, srcPath);

  return `
import { define, vdom } from 'skatejs';
import Icon from '${relativePathToSrc}/Icon';
import { getGlyphFnSymbol } from '${relativePathToSrc}/internal/symbols';

/**
 * @description Create an instance of the ${iconName} programmatically, or by using markup.
 *
 * @class ${componentName}
 * @example @html <${iconName} />
 * @example @js import ${componentName} from 'ak-icon';
 *
 * const icon = new ${componentName}();
 * document.body.appendChild(icon);
 */
class ${componentName} extends Icon {
  [getGlyphFnSymbol]() {
    return (props) => {
      const { title, description } = props;
      delete props.title;
      delete props.description;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (${svgData});
    };
  }
}

export default define('${iconName}', ${componentName});
`;
};
