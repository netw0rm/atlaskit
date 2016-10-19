/** @jsx vdom */
import { vdom, define, prop, props, ready } from 'skatejs';
import keyCode from 'keycode';
import Layer from 'ak-layer';

// styles
import shadowListStyles from './less/shadow-list.less';

// templates
import Item from './index.item';
import CheckboxItem from './index.item.checkbox';
import RadioItem from './index.item.radio';
import Group from './index.group';

// internal functions
import * as events from './internal/events';
import getItemsList from './internal/getItemsList';
import showDropdown from './internal/showDropdown';
import hideDropdown from './internal/hideDropdown';
import sendCancellableEvents from './internal/sendCancellableEvents';
import isDescendantOf from './internal/isDescendantOf';
import getDropdownMinwidth from './internal/getDropdownMinwidth';
import getDropdownMaxheight from './internal/getDropdownMaxheight';

// offset of dropdown from the trigger in pixels "[x-offset] [y-offset]"
const offset = '0 4';
const activatedFrom = Symbol('activatedFrom');
const keyDownOnceOnOpen = Symbol('keyDownOnceOnOpen');
const handleClickOutside = Symbol('handleClickOutside');
const handleKeyDown = Symbol('handleKeyDown');
const triggerSlot = Symbol('triggerSlot');
const layerElem = Symbol('layerElem');


function openDialog(elem) {
  sendCancellableEvents(
    events.openBefore,
    events.openAfter,
    elem,
    elem,
    () => {
      if (!elem.open) {
        props(elem, { open: true });
      }
    }
  );
}

function closeDialog(elem) {
  sendCancellableEvents(
    events.closeBefore,
    events.closeAfter,
    elem,
    elem,
    () => {
      if (elem.open) {
        props(elem, { open: false });
      }
    }
  );
}

function toggleDialog(elem, e) {
  if (elem.open) {
    closeDialog(elem, e);
  } else {
    openDialog(elem, e);
  }
}

function selectSimpleItem(elem) {
  closeDialog(elem);
}

function selectCheckboxItem(item) {
  item.checked = !item.checked;
}

function selectRadioItem(elem, event) {
  const radioGroupItems = event.detail.item.parentNode.children;
  [...radioGroupItems].forEach((val) => {
    if (val.checked && val instanceof RadioItem) {
      val.checked = false;
    }
  });

  event.detail.item.checked = true;
}

function handleItemActivation(elem, event) {
  if (event.detail.item instanceof CheckboxItem) {
    selectCheckboxItem(event.detail.item);
  } else if (event.detail.item instanceof RadioItem) {
    selectRadioItem(elem, event);
  } else {
    selectSimpleItem(elem, event);
  }
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
  const list = getItemsList(elem.children);
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

/**
 * @description The definition for the Dropdown component.
 * @class Dropdown
 * @example @html <ak-dropdown></ak-dropdown>
 * @example @js import Dropdown from 'ak-dropdown';
 * const dropdown = new Dropdown();
 */
export default define('ak-dropdown', {
  created(elem) {
    elem.addEventListener(events.trigger.activated, (e) => {
      if (e.detail) {
        elem[activatedFrom] = e.detail.eventType;
      }
      toggleDialog(elem, e);
    });
    elem.addEventListener(events.item.activated, (e) => {
      sendCancellableEvents(
        events.changeBefore,
        events.changeAfter,
        elem,
        e.detail.item,
        () => {
          handleItemActivation(elem, e);
        }
      );
    });

    elem.addEventListener(events.item.up, () => changeFocus(elem, 'prev'));
    elem.addEventListener(events.item.down, () => changeFocus(elem, 'next'));
    elem.addEventListener(events.item.tab, () => closeDialog(elem));

    elem[handleClickOutside] = (e) => {
      if (elem.open && e.target !== elem && !isDescendantOf(e.target, elem) &&
        !(e.path && e.path.indexOf(elem) > -1)) {
        closeDialog(elem);
      }
    };
    elem[handleKeyDown] = (e) => {
      if (elem.open) {
        if (e.keyCode === keyCode('escape')) {
          closeDialog(elem);
        } else if (!elem[keyDownOnceOnOpen] && e.keyCode === keyCode('down')) {
          elem[keyDownOnceOnOpen] = true;
          getItemsList(elem.children)[0].focused = true;
        }
      }
    };
  },
  attached(elem) {
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
    if (elem.children && elem.children[1] && elem.children[1] instanceof Group) {
      elem.children[1].style.marginTop = '0';
    }
    let target = elem.target;

    return (
      <div
        style={{ position: elem.stepOutside || elem.boundariesElement ? 'static' : 'relative' }}
      >
        <div ref={el => (target = el)}>
          <slot name="trigger" ref={el => (elem[triggerSlot] = el)} />
        </div>
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
              // hack for the AK-577 until someone thinks of a better solution
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
    // remove when the AK-343 is fixed
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
            showDropdown(elem, keyDownOnceOnOpen, activatedFrom);
          } else {
            hideDropdown(elem, keyDownOnceOnOpen, activatedFrom);
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
