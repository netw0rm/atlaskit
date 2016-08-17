/** @jsx vdom */
import 'style!./host.less';
import shadowListStyles from './shadow-list.less';
import { vdom, define, prop } from 'skatejs';
import ItemDefinition from './item';
import TriggerDefinition, { TriggerButtonDefinition } from './trigger';
import keyCode from 'keycode';
import Layer from 'ak-layer';

function toggleDialog(elem, value) {
  const isOpen = value === undefined ? !elem.open : value;
  const list = elem.querySelectorAll('ak-dropdown-item');
  if ((elem.open !== isOpen)) {
    elem.open = isOpen;
  }
  if (!list || !list.length) {
    return;
  }
  const trigger = elem.querySelector('ak-dropdown-trigger');
  let triggerButton;
  if (trigger) {
    trigger.opened = isOpen;
    triggerButton = trigger.querySelector('ak-trigger-button');
  }
  if (triggerButton) {
    triggerButton.opened = isOpen;
  }
  // when the dialog is open the first item element should be focused,
  // properties 'first' and 'last' should be set (TBD: change to :first-child and :last-child)
  // when it's closed everything should be cleared
  if (isOpen) {
    list[0].focused = true;
    list[0].first = true;
    list[list.length - 1].last = true;
  } else {
    list.forEach((item) => {
      item.focused = false;
      if (item.first) {
        item.first = false;
      }
      if (item.last) {
        item.last = false;
      }
    });
  }
}

function selectItem(elem, event) {
  const list = elem.querySelectorAll('ak-dropdown-item');
  const l = list.length;
  for (let i = 0; i < l; i++) {
    const item = list[i];
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
  const list = elem.querySelectorAll('ak-dropdown-item');
  const l = list.length;
  for (let i = 0; i < l; i++) {
    const item = list[i];
    if (item.focused && i) {
      item.focused = false;
      list[i - 1].focused = true;
      break;
    }
  }
}

function focusNext(elem) {
  const list = elem.querySelectorAll('ak-dropdown-item');
  const l = list.length;
  for (let i = 0; i < l; i++) {
    const item = list[i];
    if (item.focused && (i < (l - 1))) {
      item.focused = false;
      list[i + 1].focused = true;
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

export const Item = define('ak-dropdown-item', ItemDefinition);
export const Trigger = define('ak-dropdown-trigger', TriggerDefinition);
export const TriggerButton = define('ak-trigger-button', TriggerButtonDefinition);

/**
 * @description The definition for the Dropdown component.
 * @class Dropdown
 * @example @html <ak-dropdown></ak-dropdown>
 * @example @js import Dropdown from 'ak-dropdown';
 * const dropdown = new Dropdown();
 */
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
  render(elem) {
    let target;
    const listWidthGap = 10;
    let styles;

    return (
      <div>
        <div
          ref={(el) => {
            target = el;
            styles = {
              minWidth: `${target.getBoundingClientRect().width + listWidthGap}px`,
            };
          }}
        >
          <slot name="trigger" />
        </div>
        <div style={{ display: elem.open ? 'block' : 'none' }}>
          <Layer
            position="bottom left"
            target={target}
            ref={(layer) => {
              setTimeout(() => {
                if (elem.open && layer.alignment) {
                    // by default dropdown has opacity 0
                    // and only with attribute 'positioned' it has opacity 1
                    // this behavior is to avoid 'flashing' of dropdown
                    // when it's initially positioning itself on a page
                  elem.setAttribute('positioned', true);
                }
              });
            }
          }
          >
            <div className={shadowListStyles.locals.list} style={styles}>
              <style>{shadowListStyles.toString()}</style>
              <slot />
            </div>
          </Layer>
        </div>
      </div>
    );
  },
  props: {
    /**
     * @description Open/closed state of the dropdown
     * @memberof Dropdown
     * @default false
     * @type {Boolean}
     * @example @html <ak-dropdown open></ak-dropdown>
     * @example @js dropdown.open = true;
     */
    open: prop.boolean({
      attribute: true,
      set(elem, data) {
        if (elem && data.newValue !== data.oldValue) {
          toggleDialog(elem, data.newValue);
        }
      },
    }),
  },
});
