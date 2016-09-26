const iconNameToComponentName = require('../src/iconNameToComponentName');

module.exports = ({ iconName, svgData, width, height, unprefixedIconName }) => {
  const componentName = iconNameToComponentName(unprefixedIconName);

  return `
import { define, vdom } from 'skatejs';

const Glyph = (props) => {
  const { title, description } = props;
  delete props.title;
  delete props.description;

  // eslint-disable-next-line max-len, react/jsx-space-before-closing
  return (${svgData});
};

/**
 * @description Create an instance of the ${iconName} programmatically, or by using markup.
 * @class ${componentName}
 * @example @html <${iconName} />
 * @example @js import ${componentName} from 'ak-icon';
 *
 * const icon = new ${componentName}();
 * document.body.appendChild(icon);
 */
export default define('${iconName}', {
  render(elem) {
    const { title } = elem;

    return (
      <div style={{ display: 'flex', width: '${width}px', height: '${height}px' }}>
        <div style={{ margin: 'auto' }}>
          <Glyph role="img" title={title} />
        </div>
      </div>
    );
  },
  props: {
    /**
     * @description (Required) The icon label
     *              This is a required attribute.
     *              Omitting it will make the icon inaccessible for screen readers, etc..
     *              The text passed will be sanitized, e.g. passed HTML will be represented
     *              as plain text.
     *
     * @memberof ${componentName}
     * @instance
     * @type {string}
     * @example @html <${iconName} label="Accessible description of the icon" />
     * @example @js const icon = new ${componentName}();
     * icon.label = 'Accessible description of the icon';
     * document.body.appendChild(icon);
     */
    label: {
      attribute: true,
    },
  },
});
`;
};
