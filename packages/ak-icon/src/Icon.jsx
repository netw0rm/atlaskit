import React, { PropTypes, PureComponent } from 'react';
import classnames from 'classnames';

import styles from 'style!./styles.less';
import { NotImplementedError } from './internal/exceptions';
import size from './internal/size';

/**
 * @description Icon interface. All icons follow this structure.
 * @class Icon
 */
export default class Icon extends PureComponent {
  static propTypes = {
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
       */
    size: PropTypes.oneOf(Object.keys(size).map(k => size[k])),
    /**
       * @description (Optional) A handler to execute when the icon is clicked.
       *
       * Defaults to a noop.
       *
       * @memberof Icon
       * @instance
       * @type {function}
       */
    onClick: PropTypes.func,
  }

  static defaultProps = {
    onClick() {},
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
    const iconBodyClasses = classnames([styles.iconBody, styles[this.props.size]]);
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <span className={iconBodyClasses} onClick={this.props.onClick}>
        <Glyph className={styles.svg} label={this.props.label} role="img" />
      </span>
    );
  }
}

export { NotImplementedError, size };
