import React, { PropTypes, PureComponent } from 'react';
import classnames from 'classnames';

import styles from 'style!./styles.less';
import { NotImplementedError } from './internal/exceptions';

const sizes = ['small', 'medium', 'large', 'xlarge'];
const size = sizes.reduce((p, c) => Object.assign(p, { [c]: c }), {});

export default class Icon extends PureComponent {
  static propTypes = {
    /** string to apply as the svg title element */
    label: PropTypes.string.isRequired,
    /** control the size of the icon */
    size: PropTypes.oneOf(sizes),
    /** onclick handler for the icon element */
    onClick: PropTypes.func,
  }

  static defaultProps = {
    onClick() {},
  }

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
