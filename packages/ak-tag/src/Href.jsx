import React from 'react';
import styles from './styles.less';

/* eslint-disable react/prop-types */

export default props => (
  <a
    {...props}
    tabIndex="-1"
    className={styles.locals.href}
    href={props.href}
  >
    {props.children}
  </a>
);
