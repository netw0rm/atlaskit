import React from 'react';
import shadowStyles from './less/styles.less';
import Element from './Element';

/* eslint-disable react/prop-types */
export default props =>
  <Element {...props}>
    <span className={shadowStyles.locals.buttonWrapper}>
      {props.children}
    </span>
  </Element>;
