/** @jsx React.createElement */
import React, { PropTypes } from 'react';
import classnames from 'classnames';

import styles from './styles.less';
import size from './internal/size';

const Root = (props) => {
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

Root.propTypes = {
  size: PropTypes.oneOf(Object.values(size)),
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default Root;
