/** @jsx vdom */
import 'style!./host.less';

import { vdom, define } from 'skatejs';
import { KeyPressHandler } from 'akutil-common';
import './item';
import './list';
import './trigger';

let keyPress;

function toggleDialog(elem, value) {
  const list = elem.childNodes[1];
  const trigger = elem.childNodes[0];
  return () => {
    const isOpen = value === undefined ? !list.open : value;

    if (isOpen) {
      list.open = isOpen;
      trigger.opened = isOpen;
      list.childNodes.forEach((item) => {
        item.focused = false;
      });
      list.childNodes[0].focused = true;
    } else {
      list.childNodes.forEach((item) => {
        item.focused = false;
      });
      list.open = isOpen;
      trigger.opened = isOpen;
    }
  };
}

function selectItem(elem) {
  const list = elem.childNodes[1];
  return (e) => {
    const l = list.childNodes.length;
    for (let i = 0; i < l; i++) {
      const item = list.childNodes[i];
      if (item.selected) {
        item.selected = false;
      }
    }

    e.detail.item.selected = true;
    toggleDialog(elem, false)();
  };
}

function isChildOf(child, parent) {
  if (child.parentNode === parent) {
    return true;
  } else if (child.parentNode === null) {
    return false;
  }

  return isChildOf(child.parentNode, parent);
}

function handleClickOutside(elem) {
  return (e) => {
    if (e.target !== elem && !isChildOf(e.target, elem)) {
      toggleDialog(elem, false)();
    }
  };
}

function focusPrev(elem) {
  const list = elem.childNodes[1];
  return () => {
    const l = list.childNodes.length;
    for (let i = 0; i < l; i++) {
      const item = list.childNodes[i];
      if (item.focused && i) {
        item.focused = false;
        list.childNodes[i - 1].focused = true;
        break;
      }
    }
  };
}

function focusNext(elem) {
  const list = elem.childNodes[1];
  return () => {
    const l = list.childNodes.length;
    for (let i = 0; i < l; i++) {
      const item = list.childNodes[i];
      if (item.focused && (i < (l - 1))) {
        item.focused = false;
        list.childNodes[i + 1].focused = true;
        break;
      }
    }
  };
}

export default define('ak-dropdown', {
  attached(elem) {
    elem.addEventListener('ak-dropdown-trigger-activated', toggleDialog(elem));
    elem.addEventListener('ak-dropdown-selected', selectItem(elem));
    elem.addEventListener('ak-dropdown-item-up', focusPrev(elem));
    elem.addEventListener('ak-dropdown-item-down', focusNext(elem));
    elem.addEventListener('ak-dropdown-item-tab', toggleDialog(elem, false));

    keyPress = new KeyPressHandler('ESCAPE', toggleDialog(elem, false));
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
