import React, { PropTypes, PureComponent } from 'react';
import classnames from 'classnames';

import styles from 'style!./styles.less';
import { NotImplementedError } from './internal/exceptions';
import size from './internal/size';

export default class Icon extends PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    size: PropTypes.oneOf(Object.keys(size).map(k => size[k])),
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
