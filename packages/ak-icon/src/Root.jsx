/** @jsx React.createElement */
import React from 'react';
import classnames from 'classnames';

import shadowStyles from './shadow.less';

/* eslint-disable react/prop-types */
export default (props) => {
  const classes = {
    [shadowStyles.locals.icon]: true,
    [shadowStyles.locals[props.size]]: !!props.size,
  };
  return (
    <div className={classnames(classes)}>
      <style>{shadowStyles.toString()}</style>
      {props.children}
    </div>
  );
};
