import { vdom } from 'skatejs';
import classNames from 'classnames';

import shadowStyles from './shadow.less';
import {
  compact as compactAppearance,
  subtle as subtleAppearance,
} from './internal/appearance';

const eventHandlers = Symbol('eventHandlers');

function cleanUpEventHandlers(ref) {
  if (ref[eventHandlers]) {
    Object.keys(ref[eventHandlers]).forEach((eventName) => {
      const config = ref[eventHandlers][eventName];
      ref.removeEventListener(eventName, config.listener, config.useCapture);
    });
  }
  ref[eventHandlers] = null;
}

// Clean up any existing handlers before re-attaching them to avoid having multiple handlers
function setupFocusEventHandlers(ref, props) {
  cleanUpEventHandlers(ref);
  ref[eventHandlers] = {
    focus: {
      listener: props.onFocus,
      useCapture: true,
    },
    blur: {
      listener: props.onBlur,
      useCapture: true,
    },
  };

  Object.keys(ref[eventHandlers]).forEach((eventName) => {
    const config = ref[eventHandlers][eventName];
    ref.addEventListener(eventName, config.listener, config.useCapture);
  });
}

/* eslint-disable react/prop-types */
export default (props, children) => {
  const slotWrapperClasses = classNames(shadowStyles.locals.slotWrapper, {
    [shadowStyles.locals.compact]: props.appearance === compactAppearance,
    [shadowStyles.locals.subtle]: props.appearance === subtleAppearance,
    [shadowStyles.locals.disabled]: props.disabled,
    [shadowStyles.locals.focused]: props.focused,
    [shadowStyles.locals.invalid]: props.invalid && !props.focused,
  });
  return (
    <div
      className={slotWrapperClasses}
      ref={(ref) => {
        setupFocusEventHandlers(ref, props);
        if (props.ref) {
          props.ref(ref);
        }
      }}
      {...props.eventHandlers}
    >
      {children()}
    </div>
  );
};
