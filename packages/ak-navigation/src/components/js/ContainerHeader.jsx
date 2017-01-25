import React, { PureComponent, PropTypes } from 'react';
import styles from 'style!../less/ContainerHeader.less';

export default class ContainerHeader extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    return (
      <div className={styles.containerHeaderWrapper}>
        {this.props.children}
      </div>
    );
  }
}
