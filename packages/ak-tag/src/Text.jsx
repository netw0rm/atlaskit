import styles from 'style!./styles.less';
import React, { PureComponent, PropTypes } from 'react';

/* eslint-disable react/prefer-stateless-function */
export default class Text extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  render = () => (
    <span className={styles.text}>
      {this.props.children}
    </span>
  )
}
