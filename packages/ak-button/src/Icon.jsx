import React from 'react';
import shadowStyles from './less/styles.less';

/* eslint-disable react/prop-types */
export default props =>
  (props.source ? <span className={shadowStyles.locals.IconWrapper}>{props.source}</span> : null);
