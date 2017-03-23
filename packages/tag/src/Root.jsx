import styles from 'style!./styles.less';
import React, { PureComponent, PropTypes } from 'react';

export default class Root extends PureComponent {
  static propTypes = {
    children: PropTypes.element.isRequired,
  }

  render() {
    return (
      <div className={styles.rootWrapper}>
        {this.props.children}
      </div>
    );
  }
}
