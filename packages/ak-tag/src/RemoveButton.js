/** @jsx vdom */

import { vdom } from 'skatejs';

import keyHandler from './internal/keyHandler';
import shadowStyles from './shadow.less';
import RemoveIcon from './RemoveIcon';

/* eslint-disable react/prop-types */
export default (props) => {
  const removeAction = (e) => {
    e.stopPropagation();
    e.preventDefault();
    props.onActivation();
  };

  return (<button
    {...props}
    className={shadowStyles.locals.button}
    aria-label={props.text}
    onMouseDown={e => (e.preventDefault())}
    onMouseOver={() => props.onHoverStateChange(true)}
    onMouseOut={() => props.onHoverStateChange(false)}
    ref={el => (keyHandler(el, removeAction))}
    onClick={removeAction}
  >
    <RemoveIcon />
  </button>);
};
