/** @jsx vdom */

import { vdom } from 'skatejs';
import classNames from 'classnames';
import shadowStyles from './shadow.less';

/*
  eslint-disable react/prop-types, jsx-a11y/label-has-for, jsx-a11y/no-static-element-interactions
 */
export default (props, children) => {
  const labelClasses = classNames(shadowStyles.locals.labelText, {
    [shadowStyles.locals.hidden]: props.hideLabel,
  });
  // we render the label in a span that is in a div so that the label itself will be display: block
  // but we can put the click handler on the span so that clicking white space after the label
  // doesnt call anything
  return (
    <label className={shadowStyles.locals.label}>
      <div className={labelClasses}>
        <span onClick={props.onLabelClick}>{props.label}</span>
        {props.required ? <span class={shadowStyles.locals.required}>*</span> : null}
      </div>
      {children()}
    </label>
  );
};
