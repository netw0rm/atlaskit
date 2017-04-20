import React, { PureComponent, PropTypes } from 'react';
import styles from '../../styles.less';

export default class SecondaryText extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    return (
      <span className={styles.secondaryText}>
        {this.props.children}
      </span>
    );
  }
}
