import React from 'react';
import styles from './styles.less';

/* eslint-disable react/prop-types */
export default props => (
  <div {...props} className={styles.locals.root}>
    <style>{styles.toString()}</style>
    {props.children}
  </div>
);
