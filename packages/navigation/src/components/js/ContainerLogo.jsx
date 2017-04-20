import React, { PureComponent, PropTypes } from 'react';
import styles from '../less/ContainerLogo.less';

export default class ContainerLogo extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    return (
      <div className={styles.containerLogo}>
        {this.props.children}
      </div>
    );
  }
}

