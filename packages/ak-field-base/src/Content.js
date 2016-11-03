import { vdom } from 'skatejs';
import classNames from 'classnames';

import shadowStyles from './shadow.less';
import { compact as compactAppearance } from './internal/appearance';

function addEventHandlers(ref, props) {
  ref.addEventListener('focus', () => props.setFocused(true), true);
  ref.addEventListener('blur', () => props.setFocused(false), true);
}

/* eslint-disable react/prop-types */
export default (props) => {
  const slotWrapperClasses = classNames(shadowStyles.locals.slotWrapper, {
    [shadowStyles.locals.compact]: props.appearance === compactAppearance,
    [shadowStyles.locals.disabled]: props.disabled,
    [shadowStyles.locals.focused]: props.focused,
    [shadowStyles.locals.invalid]: props.invalid && !props.focused,
  });
  return (
    <div className={slotWrapperClasses} ref={ref => addEventHandlers(ref, props)}>
      <slot name="input-slot" />
    </div>
  );
};
