import React, { PureComponent, PropTypes } from 'react';

import styles from './less/styles.less';

// This hack is to make sure that styles.locals exists when style loading is a noop (when we are
// running tests).
// TODO: Remove in AK-2025
styles.locals = styles.locals || {};

export default class Content extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  }

  static defaultProps = {
    children: null,
  }

  render() {
    return (<span className={styles.locals.buttonContent}>{this.props.children}</span>);
  }
}
