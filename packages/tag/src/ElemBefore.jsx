import styles from 'style!./styles.less';
import React, { PureComponent, PropTypes } from 'react';

export default class ElemBefore extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    return this.props.children ? (
      <span
        className={styles.elemBefore}
      >
        {this.props.children}
      </span>
    ) : null;
  }
}
