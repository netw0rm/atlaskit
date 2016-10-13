import { vdom } from 'skatejs';
import classNames from 'classnames';
import shadowStyles from './shadow.less';

/* eslint-disable react/prop-types */
export default (props, children) => {
  const labelClasses = classNames(shadowStyles.locals.labelText, {
    [shadowStyles.locals.hidden]: props.hideLabel,
  });
  // we render the label in a span that is in a div so that the label itself will be display: block
  // but we can put the click handler on the span so that clicking white space after the label
  // doesnt call the switchToEditingCallback
  return (
    <label className={shadowStyles.locals.label}>
      <div className={labelClasses}>
        <span onClick={props.switchToEditingCallback}>{props.label}</span>
      </div>
      {children()}
    </label>
  );
};
