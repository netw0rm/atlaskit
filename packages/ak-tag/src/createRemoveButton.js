import { vdom, props } from 'skatejs';
import { KeyPressHandler } from 'akutil-common';

import shadowStyles from './shadow.less';
import RemoveIcon from './remove-icon';

export default (elem, buttonHoverSymbol) => {
  const hoverAction = (toggle) => props(elem, { [buttonHoverSymbol]: toggle });
  const removeAction = (e) => {
    e.stopPropagation();
    e.preventDefault();
    elem.remove();
  };

  const attachButtonKeyHandlers = (el) => {
    const handler = new KeyPressHandler('ENTER', removeAction, el);
    handler.add('SPACE', removeAction);
  };

  return (properties) => (<button
    {...properties}
    className={shadowStyles.locals.button}
    aria-label={properties.text}
    onmousedown={(e) => (e.preventDefault())}
    onmouseover={() => hoverAction(true)}
    onmouseout={() => hoverAction(false)}
    ref={attachButtonKeyHandlers}
    onclick={removeAction}
  >
    <RemoveIcon />
  </button>);
};
