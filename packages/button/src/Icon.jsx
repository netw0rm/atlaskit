import React, { PureComponent, PropTypes } from 'react';

import styles from './less/styles.less';

// This hack is to make sure that styles.locals exists when style loading is a noop (when we are
// running tests).
// TODO: Remove in AK-2025
styles.locals = styles.locals || {};

/* eslint-disable react/no-unused-prop-types, react/prefer-stateless-function */
export default class Icon extends PureComponent {
  static propTypes = {
    source: PropTypes.node,
  }

  static defaultProps = {
    source: null,
  }

  render() {
    return (<span className={styles.locals.IconWrapper}>{this.props.source}</span>);
  }
}
