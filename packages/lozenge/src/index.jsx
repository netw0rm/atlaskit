import classNames from 'classnames';
import React, { PureComponent, PropTypes } from 'react';
import styles from 'style!../src/style.less';

const APPEARANCE_ENUM = {
  values: ['default', 'success', 'removed', 'inprogress', 'new', 'moved'],
  defaultValue: 'default',
};

export default class Lozenge extends PureComponent {
  static propTypes = {
    isBold: PropTypes.bool,
    appearance: PropTypes.oneOf(APPEARANCE_ENUM.values),
    children: PropTypes.node,
  };

  static defaultProps = {
    isBold: false,
    appearance: APPEARANCE_ENUM.defaultValue,
  };

  // returns the assigned appearance if valid, falling back to the default otherwise
  validAppearance() {
    const { appearance } = this.props;
    const { values, defaultValue } = APPEARANCE_ENUM;
    return values.indexOf(appearance) !== -1 ? appearance : defaultValue;
  }

  render() {
    const { isBold, children } = this.props;
    const classes = classNames([
      { [styles.bold]: isBold },
      styles.lozenge,
      styles[this.validAppearance()],
    ]);
    return (
      <span className={classes}>
        <span className={styles.content}>{children}</span>
      </span>
    );
  }
}
