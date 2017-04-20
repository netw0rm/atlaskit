import React, { PureComponent, PropTypes } from 'react';

import styles from './less/styles.less';

export default class Content extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  }

  static defaultProps = {
    children: null,
  }

  render() {
    return (<span className={styles.buttonContent}>{this.props.children}</span>);
  }
}
