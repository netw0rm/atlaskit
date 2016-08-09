/** @jsx vdom */
import 'style!./host.less';

import { vdom, define, symbols } from 'skatejs';
import { KeyPressHandler } from 'akutil-common';
import './item';
import './list';
import './trigger';

let keyPress;

function isChildOf(child, parent) {
  if (child.parentNode === parent) {
    return true;
  } else if (child.parentNode === null) {
    return false;
  }

  return isChildOf(child.parentNode, parent);
}

function closeDropdown(elem) {
  const list = elem[symbols.shadowRoot].querySelector('ak-dropdown-list');
  const trigger = elem[symbols.shadowRoot].querySelector('ak-dropdown-trigger');
  return () => {
    list.open = false;
    trigger.opened = false;
  };
}

function handleClickOutside(elem) {
  return (e) => {
    if (e.target !== elem && !isChildOf(e.target, elem)) {
      closeDropdown(elem)();
    }
  };
}

export default define('ak-dropdown', {
  attached(elem) {
    const list = elem[symbols.shadowRoot].querySelector('ak-dropdown-list');
    const trigger = elem[symbols.shadowRoot].querySelector('ak-dropdown-trigger');
    elem.addEventListener('ak-dropdown-trigger-click', () => {
      list.open = !list.open;
      trigger.opened = list.open;
    });
    elem.addEventListener('ak-dropdown-selected', () => {
      list.open = false;
      trigger.opened = false;
    });

    keyPress = new KeyPressHandler('ESCAPE', closeDropdown(elem));
    document.addEventListener('click', handleClickOutside(elem));
  },
  detached() {
    keyPress.destroy();
    document.removeEventListener('click', handleClickOutside);
  },
  render() {
    return (
      <slot />
    );
  },
});
