import React from 'react';
import classNames from 'classnames';
import styles from './styles.less';


// TODO convert this to a class and extend from PureComponent
/*
  eslint-disable react/prop-types, jsx-a11y/label-has-for, jsx-a11y/no-static-element-interactions
*/
export default (props) => {
  const labelClasses = classNames(styles.locals.labelText, {
    [styles.locals.hidden]: props.hideLabel,
  });
  // we render the label in a span that is in a div so that the label itself will be display: block
  // but we can put the click handler on the span so that clicking white space after the label
  // doesnt call anything
  return (
    <label className={styles.locals.label}>
      <div className={labelClasses}>
        <span onClick={props.onLabelClick}>{props.label}</span>
        {props.required ? <span className={styles.locals.required}>*</span> : null}
      </div>
      {props.children}
    </label>
  );
};
