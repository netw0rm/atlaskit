import React from 'react';
import styles from './styles.less';

/* eslint-disable react/prop-types */
export default props => (
  <span
    {...props}
    className={styles.locals.text}
  >
    {props.children}
  </span>
);
