/** @jsx vdom */
import 'style!./less/host.less';
import shadowListStyles from './less/shadow-list.less';
import { vdom, define, prop, props, emit, ready } from 'skatejs';
import './index.trigger';
import './index.item';
import './index.item.checkbox';
import './index.item.radio';

import GroupDefinition from './index.group';
import keyCode from 'keycode';
import Layer from 'ak-layer';
import * as events from './internal/events';

// TODO dangling to Symbol once this is supported: https://github.com/skatejs/skatejs/issues/687
/* eslint-disable no-underscore-dangle */

// Width of a dropdown should be at least width of it's trigger + 10px
const diffBetweenDropdownAndTrigger = 10;
const dropdownMinWidth = 150;
// offset of dropdown from the trigger in pixels "[x-offset] [y-offset]"
const offset = '0 2';
// tagnames of the possible dropdown items
const itemsList = 'ak-dropdown-item, ak-dropdown-item-checkbox, ak-dropdown-item-radio';

function getTriggerElement(elem) {
  return elem.triggerSlot && elem.triggerSlot.assignedNodes()[0];
}

function toggleDialog(elem, value) {
  const isOpen = value === undefined ? !elem.open : value;
  const list = elem.querySelectorAll(itemsList);

  if ((elem.open !== isOpen)) {
    elem.open = isOpen;
  }
  if (!list || !list.length) {
    return;
  }

  const trigger = getTriggerElement(elem);

  if (trigger) {
    props(trigger, { opened: isOpen });
  }

  // when the dialog is open the first item element should be focused,
  // properties 'first' and 'last' should be set (TBD: change to :first-child and :last-child)
  // when it's closed everything should be cleared
  if (isOpen) {
    list[0].focused = true;
    list[0].first = true;
    list[list.length - 1].last = true;
    elem.reposition();
    document.addEventListener('click', elem._handleClickOutside);
    document.addEventListener('keydown', elem._handleKeyDown);
    emit(elem, events.afterOpen);
  } else {
    [...list].forEach((item) => {
      item.focused = false;
      if (item.first) {
        item.first = false;
      }
      if (item.last) {
        item.last = false;
      }
    });
    document.removeEventListener('click', elem._handleClickOutside);
    document.removeEventListener('keydown', elem._handleKeyDown);
    emit(elem, events.afterClose);
  }
}

function selectSimpleItem(elem, event) {
  const list = elem.querySelectorAll('ak-dropdown-item');
  [...list].forEach((val) => {
    if (val.selected) {
      val.selected = false;
    }
  });
  event.detail.item.selected = true;
  toggleDialog(elem, false);
}

function selectCheckboxItem(item) {
  item.selected = !item.selected;
}

function selectRadioItem(elem, event) {
  const radioGroupItems = event.detail.item.parentNode.children;
  [...radioGroupItems].forEach((val) => {
    if (val.selected && val.tagName === 'AK-DROPDOWN-ITEM-RADIO') {
      val.selected = false;
    }
  });

  event.detail.item.selected = true;
}

function selectItem(elem, event) {
  // TODO: change this to a Symbol once this PR is merged https://github.com/skatejs/skatejs/pull/795
  if (event.detail.item.tagName === 'AK-DROPDOWN-ITEM-CHECKBOX') {
    selectCheckboxItem(event.detail.item);
  } else if (event.detail.item.tagName === 'AK-DROPDOWN-ITEM-RADIO') {
    selectRadioItem(elem, event);
  } else {
    selectSimpleItem(elem, event);
  }
}

function unselectItem(elem, event) {
  event.detail.item.selected = false;
}

function isDescendantOf(child, parent) {
  if (child.parentNode === parent) {
    return true;
  } else if (child.parentNode === null) {
    return false;
  }

  return isDescendantOf(child.parentNode, parent);
}

function changeFocus(elem, type) {
  const list = elem.querySelectorAll(itemsList);
  const l = list.length;

  for (let i = 0; i < l; i++) {
    const item = list[i];
    if (type === 'prev' && item.focused && !item.first) {
      item.focused = false;
      list[i - 1].focused = true;
      break;
    } else if (type === 'next' && item.focused && !item.last) {
      item.focused = false;
      list[i + 1].focused = true;
      break;
    }
  }
}

// min width of a dropdown should be more than width of the trigger (by design)
// max-width is controlled by css, everything that's exceeding its limit
// is ellipsed (by design, controlled by css)
function getDropdownMinwidth(target, dropdown) {
  const dropdownPositionedToSide =
    dropdown.position.indexOf('left') === 0 || dropdown.position.indexOf('right') === 0;
  const minWidth = !dropdownPositionedToSide ?
  target.getBoundingClientRect().width + diffBetweenDropdownAndTrigger : dropdownMinWidth;
  return `${minWidth}px`;
}

export const Group = define('ak-dropdown-group', GroupDefinition);

/**
 * @description The definition for the Dropdown component.
 * @class Dropdown
 * @example @html <ak-dropdown></ak-dropdown>
 * @example @js import Dropdown from 'ak-dropdown';
 * const dropdown = new Dropdown();
 */
export default define('ak-dropdown', {
  attached(elem) {
    elem.addEventListener(events.trigger.activated, () => toggleDialog(elem));
    elem.addEventListener(events.selected, (e) => selectItem(elem, e));
    elem.addEventListener(events.unselected, (e) => unselectItem(elem, e));
    elem.addEventListener(events.item.up, () => changeFocus(elem, 'prev'));
    elem.addEventListener(events.item.down, () => changeFocus(elem, 'next'));
    elem.addEventListener(events.item.tab, () => toggleDialog(elem, false));
    elem._handleClickOutside = (e) => {
      if (elem.open && e.target !== elem && !isDescendantOf(e.target, elem)) {
        toggleDialog(elem, false);
      }
    };
    elem._handleKeyDown = (e) => {
      if (elem.open && e.keyCode === keyCode('escape')) {
        toggleDialog(elem, false);
      }
    };
  },
  prototype: {
    reposition() {
      if (this._layer) {
        ready(this._layer, () => {
          this._layer.reposition();
        });
      }

      return this;
    },
  },
  rendered(elem) {
    const trigger = getTriggerElement(elem) || {};
    if (trigger.opened !== elem.open) {
      toggleDialog(elem, elem.open);
    }
  },
  render(elem) {
    let target = elem.target;
    return (
      <div>
        {!elem.target ?
          <div
            ref={(el) => {
              target = el;
            }}
          >
            <slot
              name="trigger"
              ref={el => (elem.triggerSlot = el)}
            />
          </div>
          : null
        }
        <Layer
          position={elem.position}
          target={target}
          enableFlip
          offset={offset}
          // TODO: this causes a positioning bug.
          // Needs to be rewritten to conditionally render the <slot />
          // See AK-343
          style={{ display: elem.open ? 'block' : 'none' }}
          ref={(layer) => {
            elem._layer = layer;
            setTimeout(() => {
              if (elem.open && layer.alignment) {
                  // by default dropdown has opacity 0
                  // and only with attribute 'positioned' it has opacity 1
                  // this behavior is to avoid 'flashing' of dropdown
                  // when it's initially positioning itself on a page
                elem.setAttribute('positioned', true);
                layer.reposition();
              }
            });
          }
        }
        >
          <div
            className={shadowListStyles.locals.list}
            style={{ minWidth: getDropdownMinwidth(target, elem) }}
            role="menu"
          >
            <style>{shadowListStyles.toString()}</style>
            <slot />
          </div>
        </Layer>
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
    }),
    /**
     * @description Position of the dropdown. See the documentation of ak-layer for more details.
     * @memberof Dropdown
     * @default bottom left
     * @type {string}
     * @example @html <ak-dropdown position="right top"></ak-dropdown>
     * @example @js dropdown.position = 'top right';
     */
    position: prop.string({
      attribute: true,
      default: 'bottom left',
    }),
    /**
     * @description Link to the target element
     * @memberof Dropdown
     * @example @js dropdown.target = document.getElementById("target");
     */
    target: {},
  },
});

export { events };
export { DropdownTrigger, DropdownTriggerButton, DropdownTriggerArrow } from './index.trigger';
