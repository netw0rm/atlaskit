/** @jsx vdom */
import 'style!./host.less';

import { vdom, define } from 'skatejs';
import './item';
import './list';
import './trigger';
import keyCode from 'keycode';

function toggleDialog(elem, value) {
  const list = elem.childNodes[1];
  const trigger = elem.childNodes[0];
  const isOpen = value === undefined ? !list.open : value;

  if (isOpen) {
    list.open = isOpen;
    trigger.opened = isOpen;
    const l = list.childNodes.length;
    list.childNodes.forEach((item, i) => {
      item.focused = false;
      if (item.first && i) {
        item.first = false;
      }
      if (item.last && i !== l - 1) {
        item.last = false;
      }
    });
    list.childNodes[0].focused = true;
    list.childNodes[0].first = true;
    list.childNodes[l - 1].last = true;
  } else {
    list.childNodes.forEach((item) => {
      item.focused = false;
    });
    list.open = isOpen;
    trigger.opened = isOpen;
  }
}

function selectItem(elem, event) {
  const list = elem.childNodes[1];
  const l = list.childNodes.length;
  for (let i = 0; i < l; i++) {
    const item = list.childNodes[i];
    if (item.selected) {
      item.selected = false;
    }
  }

  event.detail.item.selected = true;
  toggleDialog(elem, false);
}

function isChildOf(child, parent) {
  if (child.parentNode === parent) {
    return true;
  } else if (child.parentNode === null) {
    return false;
  }

  return isChildOf(child.parentNode, parent);
}

function focusPrev(elem) {
  const list = elem.childNodes[1];
  const l = list.childNodes.length;
  for (let i = 0; i < l; i++) {
    const item = list.childNodes[i];
    if (item.focused && i) {
      item.focused = false;
      list.childNodes[i - 1].focused = true;
      break;
    }
  }
}

function focusNext(elem) {
  const list = elem.childNodes[1];
  const l = list.childNodes.length;
  for (let i = 0; i < l; i++) {
    const item = list.childNodes[i];
    if (item.focused && (i < (l - 1))) {
      item.focused = false;
      list.childNodes[i + 1].focused = true;
      break;
    }
  }
}

function handleClickOutside(elem) {
  return (e) => {
    if (e.target !== elem && !isChildOf(e.target, elem)) {
      toggleDialog(elem, false);
    }
  };
}

function handleKeyPress(elem) {
  return (event) => {
    if (event.keyCode === keyCode('escape')) {
      toggleDialog(elem, false);
    }
  };
}

export default define('ak-dropdown', {
  attached(elem) {
    elem.addEventListener('ak-dropdown-trigger-activated', () => toggleDialog(elem));
    elem.addEventListener('ak-dropdown-selected', (e) => selectItem(elem, e));
    elem.addEventListener('ak-dropdown-item-up', () => focusPrev(elem));
    elem.addEventListener('ak-dropdown-item-down', () => focusNext(elem));
    elem.addEventListener('ak-dropdown-item-tab', () => toggleDialog(elem, false));

    document.addEventListener('click', handleClickOutside(elem));
    document.addEventListener('keypress', handleKeyPress(elem));
  },
  detached() {
    document.removeEventListener('click', handleClickOutside);
    document.removeEventListener('click', handleKeyPress);
  },
  render() {
    return (
      <slot />
    );
  },
});
