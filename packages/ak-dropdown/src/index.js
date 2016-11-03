/** @jsx vdom */
import { vdom, define, prop, props, emit, ready } from 'skatejs';
import keyCode from 'keycode';
import Layer from 'ak-layer';

import shadowListStyles from './less/shadow-list.less';
import './index.trigger';
import Item from './index.item';
import CheckboxItem from './index.item.checkbox';
import RadioItem from './index.item.radio';
import Group from './index.group';
import * as events from './internal/events';
import getItemsList from './internal/getItemsList';
import dropdownPositionedToSide from './internal/dropdownPositionedToSide';


// Width of a dropdown should be at least width of it's trigger + 10px
const diffBetweenDropdownAndTrigger = 10;
const dropdownMinWidth = 150;
const grid = 4;
const itemHeight = grid * 7;
const dropdownMaxHeight = (itemHeight * 9.5); // ( item height * 9.5 items) - by design

// offset of dropdown from the trigger in pixels "[x-offset] [y-offset]"
const offset = '0 4';
const activatedFrom = Symbol('activatedFrom');
const keyDownOnceOnOpen = Symbol('keyDownOnceOnOpen');
const handleClickOutside = Symbol('handleClickOutside');
const handleKeyDown = Symbol('handleKeyDown');
const triggerSlot = Symbol('triggerSlot');
const layerElem = Symbol('layerElem');

function getTriggerElement(elem) {
  return elem[triggerSlot] && elem[triggerSlot].assignedNodes()[0];
}

function openDialog(elem) {
  const list = getItemsList(elem.childNodes);
  const trigger = getTriggerElement(elem);

  elem[keyDownOnceOnOpen] = false;

  if (trigger) {
    props(trigger, { opened: true });
  }
  if (list && list.length) {
    if (elem[activatedFrom] === 'keyDown') {
      list[0].focused = true;
    }
    list[0].first = true;
    list[list.length - 1].last = true;
  }
  emit(elem, events.afterOpen);
}

function closeDialog(elem) {
  const list = getItemsList(elem.childNodes);
  const trigger = getTriggerElement(elem);

  if (trigger) {
    props(trigger, { opened: false });
  }

  list.forEach((item) => {
    item.focused = false;
    if (item.first) {
      item.first = false;
    }
    if (item.last) {
      item.last = false;
    }
  });

  emit(elem, events.afterClose);
}

function toggleDialog(elem) {
  if (elem.open) {
    props(elem, { open: false });
  } else {
    props(elem, { open: true });
  }
}

function selectSimpleItem(elem, event) {
  const list = getItemsList(elem.childNodes).filter(node => (
      node instanceof Item && !(node instanceof RadioItem) && !(node instanceof CheckboxItem)
    ));

  list.forEach((val) => {
    if (val.selected) {
      val.selected = false;
    }
  });
  event.detail.item.selected = true;
  props(elem, { open: false });
}

function selectCheckboxItem(item) {
  item.selected = !item.selected;
}

function selectRadioItem(elem, event) {
  const radioGroupItems = event.detail.item.parentNode.children;
  [...radioGroupItems].forEach((val) => {
    if (val.selected && val instanceof RadioItem) {
      val.selected = false;
    }
  });

  event.detail.item.selected = true;
}

function selectItem(elem, event) {
  if (event.detail.item instanceof CheckboxItem) {
    selectCheckboxItem(event.detail.item);
  } else if (event.detail.item instanceof RadioItem) {
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

function focusNext(list, i) {
  if (list[i + 1]) {
    if (!list[i + 1].hidden) {
      list[i + 1].focused = true;
    } else {
      focusNext(list, i + 1);
    }
  }
}

function focusPrev(list, i) {
  if (list[i - 1]) {
    if (!list[i - 1].hidden) {
      list[i - 1].focused = true;
    } else {
      focusPrev(list, i - 1);
    }
  }
}

function changeFocus(elem, type) {
  const list = getItemsList(elem.childNodes);
  const l = list.length;
  for (let i = 0; i < l; i++) {
    const item = list[i];
    if (type === 'prev' && item.focused && !item.first) {
      item.focused = false;
      focusPrev(list, i);
      break;
    } else if (type === 'next' && item.focused && !item.last) {
      item.focused = false;
      focusNext(list, i);
      break;
    }
  }
}

// min width of a dropdown should be more than width of the trigger (by design)
// max-width is controlled by css, everything that's exceeding its limit
// is ellipsed (by design, controlled by css)
function getDropdownMinwidth(target, dropdown) {
  const minWidth = dropdownPositionedToSide(dropdown) ? dropdownMinWidth :
    target.getBoundingClientRect().width + diffBetweenDropdownAndTrigger;
  return `${minWidth}px`;
}

function getDropdownMaxheight(dropdown) {
  return dropdownPositionedToSide(dropdown) ? 'auto' : `${dropdownMaxHeight}px`;
}

/**
 * @description The definition for the Dropdown component.
 * @class Dropdown
 * @example @html <ak-dropdown></ak-dropdown>
 * @example @js import Dropdown from 'ak-dropdown';
 * const dropdown = new Dropdown();
 */
export default define('ak-dropdown', {
  attached(elem) {
    elem.addEventListener(events.trigger.activated, (e) => {
      if (e.detail) {
        elem[activatedFrom] = e.detail.eventType;
      }
      toggleDialog(elem);
    });
    elem.addEventListener(events.selected, e => selectItem(elem, e));
    elem.addEventListener(events.unselected, e => unselectItem(elem, e));
    elem.addEventListener(events.item.up, () => changeFocus(elem, 'prev'));
    elem.addEventListener(events.item.down, () => changeFocus(elem, 'next'));
    elem.addEventListener(events.item.tab, () => props(elem, { open: false }));
    elem[handleClickOutside] = (e) => {
      if (elem.open && e.target !== elem && !isDescendantOf(e.target, elem) &&
        !(e.path && e.path.indexOf(elem) > -1)) {
        props(elem, { open: false });
      }
    };
    elem[handleKeyDown] = (e) => {
      if (elem.open) {
        if (e.keyCode === keyCode('escape')) {
          props(elem, { open: false });
        } else if (!elem[keyDownOnceOnOpen] && e.keyCode === keyCode('down')) {
          elem[keyDownOnceOnOpen] = true;
          getItemsList(elem.childNodes)[0].focused = true;
        }
      }
    };

    document.addEventListener('click', elem[handleClickOutside]);
    document.addEventListener('keydown', elem[handleKeyDown]);
  },
  detached(elem) {
    document.removeEventListener('click', elem[handleClickOutside]);
    document.removeEventListener('keydown', elem[handleKeyDown]);
  },
  prototype: {
    reposition() {
      if (this[layerElem]) {
        ready(this[layerElem], () => {
          this[layerElem].reposition();
        });
      }

      return this;
    },
  },
  render(elem) {
    // groups have top margin by default
    // but if the group is the very first item after the trigger, the margin is suppose to be 0
    if (elem.childNodes && elem.childNodes[1] && elem.childNodes[1] instanceof Group) {
      elem.childNodes[1].style.marginTop = '0';
    }
    let target = elem.target;

    return (
      <div
        style={{ position: elem.stepOutside || elem.boundariesElement ? 'static' : 'relative' }}
      >
        {!elem.target ?
          <div
            ref={(el) => {
              target = el;
            }}
          >
            <slot
              name="trigger"
              ref={(el) => {
                elem[triggerSlot] = el;
              }}
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
          boundariesElement={elem.boundariesElement}
          ref={(layer) => {
            elem[layerElem] = layer;
            if (layer && layer.reposition) {
              layer.reposition();
            }
          }
        }
        >
          <div
            className={shadowListStyles.locals.list}
            style={{
              maxHeight: getDropdownMaxheight(elem),
            }}
            role="menu"
            ref={(el) => {
              // hack for the AK-577 until someone think of a better solution
              el.style.minWidth = getDropdownMinwidth(target, elem);
              setTimeout(() => {
                el.style.minWidth = getDropdownMinwidth(target, elem);
              });
            }}
          >
            <style>{shadowListStyles.toString()}</style>
            <slot />
          </div>
        </Layer>
      </div>
    );
  },
  rendered(elem) {
    elem.reposition();
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
        if (data.newValue !== data.oldValue) {
          if (data.newValue) {
            openDialog(elem);
          } else {
            closeDialog(elem);
          }
        }
      },
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
    /**
     * @description Element to act as a boundary for the Dropdown.
     * The Dropdown will not sit outside this element if it can help it.
     * If, through it's normal positioning, it would end up outside the boundary the Dropdown
     * will flip positions.
     * If not set the boundary will be the current viewport.
     * @memberof Layer
     * @instance
     * @type HTMLElement
     * @example @js dropdown.boundariesElement = document.body.querySelector('#container');
     */
    boundariesElement: {},
    /**
     * @description If the dropdown is placed inside an element with overflow:hidden, this property
     * should be set to `true` in order for the Dropdown to be able to step outside the container
     * @memberof Dropdown
     * @instance
     * @default false
     * @type Boolean
     * @example @html <ak-dropdown step-outside></ak-dropdown>
     * @example @js dropdown.stepOutside = true;
     */
    stepOutside: prop.boolean({
      attribute: true,
    }),
  },
});

export { events, Item, CheckboxItem, RadioItem, Group };
export { DropdownTrigger, DropdownTriggerButton, DropdownTriggerArrow } from './index.trigger';
