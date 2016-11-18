/** @jsx React.createElement */
import React, { PropTypes } from 'react';
import styles from './styles.less';

const Content = props => (
  <span className={styles.locals.content}>
    {props.children}
  </span>
);
Content.propTypes = { children: PropTypes.node };

export default Content;
