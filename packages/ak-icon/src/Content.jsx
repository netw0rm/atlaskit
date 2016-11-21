/** @jsx React.createElement */
import React, { Component, PropTypes } from 'react';
import styles from './styles.less';

// eslint-disable-next-line react/prefer-stateless-function
export default class Content extends Component {
  static get propTypes() {
    return { children: PropTypes.node };
  }

  render() {
    return (
      <span className={styles.locals.content}>
        {this.props.children}
      </span>
    );
  }
}
