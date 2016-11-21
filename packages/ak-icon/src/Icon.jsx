/** @jsx React.createElement */
import React, { PropTypes, Component } from 'react';

import Content from './Content';
import Root from './Root';
import { NotImplementedError } from './internal/exceptions';
import size from './internal/size';


/**
 * @description Icon interface. All icons follow this structure.
 * @class Icon
 */
export default class Icon extends Component {
  static get propTypes() {
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
      label: PropTypes.string.isRequired,
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
      size: PropTypes.oneOf(Object.values(size)),
      onClick: PropTypes.func,
    };
  }

  static get defaultProps() {
    return {
      size: size.small,
      onClick() {},
    };
  }

  /**
  * This method has to be implemented by subclasses and must return a template function.
  * This method should not be used directly.
  *
  * @throws {NotImplementedError} throws an error if the subclass does not override this method
  * @private
  * @return {Function} a template function
  */
  // eslint-disable-next-line class-methods-use-this
  getGlyphTemplate() {
    throw new NotImplementedError('Subclasses need to provide an implementation');
  }

  render() {
    const Glyph = this.getGlyphTemplate();
    const { label, size: iconSize, onClick } = this.props;

    return (
      <Root size={iconSize} onClick={onClick}>
        <Content>
          <Glyph role="img" label={label} />
        </Content>
      </Root>
    );
  }
}

export { NotImplementedError, size };
