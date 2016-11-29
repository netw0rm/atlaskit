import styles from 'style!./styles.less';
import React, { PureComponent, PropTypes } from 'react';

/* eslint-disable react/prefer-stateless-function */
export default class Root extends PureComponent {
  static propTypes = {
    children: PropTypes.element.isRequired,
  }

  render = () => (
    <div className={styles.rootWrapper}>
      {this.props.children}
    </div>
  )
}
