import { vdom } from 'skatejs';
import { KeyPressHandler } from 'akutil-common';

import shadowStyles from './shadow.less';
import RemoveIcon from './RemoveIcon';

/* eslint-disable react/prop-types */
export default (props) => {
  const removeAction = (e) => {
    e.stopPropagation();
    e.preventDefault();
    props.onActivation();
  };

  const attachButtonKeyHandlers = (el) => {
    const handler = new KeyPressHandler('ENTER', removeAction, el);
    handler.add('SPACE', removeAction);
  };

  return (<button
    {...props}
    className={shadowStyles.locals.button}
    aria-label={props.text}
    onmousedown={(e) => (e.preventDefault())}
    onmouseover={() => props.onHoverStateChange(true)}
    onmouseout={() => props.onHoverStateChange(false)}
    ref={attachButtonKeyHandlers}
    onclick={removeAction}
  >
    <RemoveIcon />
  </button>);
};
