import React from 'react';
import classNames from 'classnames';

import shadowStyles from './styles.less';
import {
  compact as compactAppearance,
  subtle as subtleAppearance,
} from './internal/appearance';

// We have to create this function outside the statelss functions scope so that the reference we,
// pass to ref is the same each time (and our event handlers only get applied once).
// This is only required because we need to set the useCapture flag on the event handlers, otherwise
// we'd simply use the onFocus and onBlur props
// function addEventHandlers(ref, props) {
//   ref.addEventListener('focus', props.onFocusCallback, true);
//   ref.addEventListener('blur', props.onBlurCallback, true);
// }

// TODO convert this to a class and extend from PureComponent
/* eslint-disable react/prop-types */
export default (props) => {
  const contentClasses = classNames(shadowStyles.locals.content, {
    [shadowStyles.locals.compact]: props.appearance === compactAppearance,
    [shadowStyles.locals.subtle]: props.appearance === subtleAppearance,
    [shadowStyles.locals.disabled]: props.disabled,
    [shadowStyles.locals.focused]: props.focused,
    [shadowStyles.locals.invalid]: props.invalid && !props.focused,
  });
  return (
    <div
      className={contentClasses}
      onFocusCapture={props.onFocusCallback}
      onBlurCapture={props.onBlurCallback}
    >
      {props.children}
    </div>
  );
};
