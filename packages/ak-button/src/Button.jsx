import React from 'react';
import styles from './less/styles.less';
import Element from './Element';

/* eslint-disable react/prop-types */
export default props =>
  <Element {...props}>
    <span className={styles.locals.buttonWrapper}>
      {props.children}
    </span>
  </Element>;
