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
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className={classnames(classes)} onClick={props.onClick}>
      <style>{styles.toString()}</style>
      {props.children}
    </div>
  );
};
