const path = require('path');
const iconNameToComponentName = require('../src/iconNameToComponentName');
const { tmpFolderName, glyphFolderName } = require('./constants');

module.exports = ({
  iconName,
  svgData,
  unprefixedIconName,
  iconRelativePathToSrc,
  iconRelativePathToSrcNoExt,
}) => {
  const componentName = iconNameToComponentName(unprefixedIconName);

  const srcPath = path.join(__dirname, '..', 'src');
  const currentJsPath = path.join(srcPath, tmpFolderName, path.dirname(iconRelativePathToSrc));
  const relativePathToSrc = path.relative(currentJsPath, srcPath);

  /* eslint-disable max-len */
  return `
import { define, vdom } from 'skatejs';
import Icon from '${relativePathToSrc}/Icon';

/**
 * @description Create an instance of the ${iconName} programmatically, or by using markup.
 *
 * @class ${componentName}
 * @example @html <${iconName} label="My label" />
 * @example @js import ${componentName} from 'ak-icon/${glyphFolderName}/${iconRelativePathToSrcNoExt}';
 *
 * const icon = new ${componentName}();
 * icon.label = 'My label';
 * document.body.appendChild(icon);
 *
 * // or via JSX
 * const ret = (<${iconName} label="My label" />);
 * @example @js // only do this if you have tree-shaking enabled in your build
 * import { ${componentName} } from 'ak-icon';
 *
 * const icon = new ${componentName}();
 * icon.label = 'My label';
 * document.body.appendChild(icon);
 */
class ${componentName} extends Icon {

  /**
  * Returns the template function for the ${unprefixedIconName} icon
  *
  * @memberof ${componentName}
  * @function
  * @instance
  * @private
  * @return {Function} The template function with the glyph
  */
  getGlyphTemplate() {
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
/* eslint-enable max-len */
};
