import styles from 'style!./styles.less';
import React, { PureComponent, PropTypes } from 'react';

/* eslint-disable react/prefer-stateless-function,jsx-a11y/no-static-element-interactions */
export default class ElemBefore extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    return (
      <span
        className={styles.elemBefore}
      >
        {this.props.children}
      </span>
    );
  }
}
