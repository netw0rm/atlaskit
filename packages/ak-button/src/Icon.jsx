import React from 'react';
import styles from './less/styles.less';

/* eslint-disable react/prop-types */
export default props =>
  (props.source ? <span className={styles.locals.IconWrapper}>{props.source}</span> : null);
