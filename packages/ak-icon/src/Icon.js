import { Component, vdom } from 'skatejs';
import * as exceptions from './internal/exceptions';
import { enumeration } from 'akutil-common';
import Root from './Root';
import Content from './Content';

/**
 * Icon size values.
 *
 * @exports size
 * @enum {string}
 */
const size = {
  /** small icon */
  small: 'small',
  /** medium icon */
  medium: 'medium',
  /** large icon */
  large: 'large',
  /** xlarge icon */
  xlarge: 'xlarge',
};

const SIZE_ATTRIBUTE_ENUM = {
  attribute: 'size',
  values: Object.values(size),
  missingDefault: '',
  invalidDefault: '',
};

/**
 * @description Icon interface. All icons follow this structure.
 * @class Icon
 */
class Icon extends Component {

  static get props() {
    return {
      /**
       * @description (Required) The icon label
       *              This is a required attribute.
       *              Omitting it will make the icon inaccessible for screen readers, etc..
       *              The text passed will be sanitized, e.g. passed HTML will be represented
       *              as plain text.
       *
       * @memberof Icon
       * @instance
       * @type {string}
       * @example @html <ak-icon-* label="Accessible description of the icon" />
       * @example @js import SomeIcon from 'ak-icon/glyph/some';
       * const icon = new SomeIcon();
       * icon.label = 'Accessible description of the icon';
       * document.body.appendChild(icon);
       */
      label: {
        attribute: true,
      },

      /**
       * @description (Optional) An icon size.
       *
       * Defaults to an empty string (which means it uses the default size).
       *
       * @memberof Icon
       * @instance
       * @type {size}
       * @default small
       * @example @html <ak-icon-* size="medium">
       * @example @js import SomeIcon from 'ak-icon/glyph/some';
       * const icon = new SomeIcon();
       * icon.size = 'medium';
       * document.body.appendChild(icon);
       */
      size: enumeration(SIZE_ATTRIBUTE_ENUM)({
        attribute: true,
      }),

    };
  }

  static render(elem) {
    const { label, getGlyphTemplate } = elem;
    const Glyph = getGlyphTemplate();

    return (
      <Root>
        <Content>
          <Glyph role="img" label={label} />
        </Content>
      </Root>
    );
  }

  /**
  * This method has to be implemented by subclasses and must return a template function.
  * This method should not be used directly.
  *
  * @throws {NotImplementedError} throws an error if the subclass does not override this method
  * @private
  * @return {Function} a template function
  */
  getGlyphTemplate() {
    throw new exceptions.NotImplementedError('Subclasses need to provide an implementation');
  }
}

export default Icon;
export const NotImplementedError = exceptions.NotImplementedError;
export { size };
