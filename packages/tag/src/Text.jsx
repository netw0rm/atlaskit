import styles from 'style!./styles.less';
import React, { PureComponent, PropTypes } from 'react';

export default class Text extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  render() {
    return (
      <span className={styles.text}>
        {this.props.children}
      </span>
    );
  }
}
