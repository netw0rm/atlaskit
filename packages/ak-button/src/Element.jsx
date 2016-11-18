import React from 'react';
import classNames from 'classnames';
import styles from './less/styles.less';
import getClasses from './internal/get-button-classes';

/* eslint-disable react/prop-types */
export default (props) => {
  const commonProps = {
    className: classNames(getClasses(styles.locals, props)),
    disabled: props.disabled,
    onMouseDown: e => e.preventDefault(),
  };
  if (props.href) {
    if (props.disabled) {
      return (<span {...commonProps}>{props.children}</span>);
    }
    return (<a href={props.href} target={props.target} {...commonProps}>{props.children}</a>);
  }
  return (<button type={props.type} {...commonProps}>{props.children}</button>);
};
