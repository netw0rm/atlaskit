/** @jsx React.createElement */
import React from 'react';
import styles from './styles.less';

const Content = props => (
  <span className={styles.locals.content}>
    {props.children}
  </span>
);
Content.propTypes = { children: React.PropTypes.node };

export default Content;
