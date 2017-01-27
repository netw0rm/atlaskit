import React, { PureComponent, PropTypes } from 'react';

import styles from './less/styles.less';

/* eslint-disable react/no-unused-prop-types */
export default class Icon extends PureComponent {
  static propTypes = {
    source: PropTypes.node,
  }

  static defaultProps = {
    source: null,
  }

  render = () => (<span className={styles.locals.IconWrapper}>{this.props.source}</span>)
}
