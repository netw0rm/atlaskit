/** @jsx React.createElement */
import React from 'react';
import classnames from 'classnames';

import styles from './styles.less';

/* eslint-disable react/prop-types */
export default (props) => {
  const classes = {
    [styles.locals.icon]: true,
    [styles.locals[props.size]]: !!props.size,
  };
  return (
    <div className={classnames(classes)}>
      <style>{styles.toString()}</style>
      {props.children}
    </div>
  );
};
