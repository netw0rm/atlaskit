import { emit, vdom, prop, define } from 'skatejs';
import 'ak-button';
import 'ak-icon';
import keyCode from 'keycode';
import { trigger as triggerEvents } from './internal/events';

function handleKeyDown(elem) {
  return (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!elem.disabled && [
      keyCode('down'),
      keyCode('space'),
      keyCode('enter')].indexOf(e.keyCode) > -1) {
      emit(elem, triggerEvents.activated);
    }
  };
}

function handleClick(elem) {
  return (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!elem.disabled) {
      emit(elem, triggerEvents.activated);
    }
  };
}
export const DropdownTrigger = define('ak-dropdown-trigger', {
  render(elem) {
    return (
      <div
        tabIndex={elem.tabIndex}
        onclick={handleClick(elem)}
        onkeydown={handleKeyDown(elem)}
      >
        <slot />
      </div>
    );
  },
  props: {
    /**
     * @description disabled state of the dropdown's trigger
     * @memberof Dropdown
     * @default false
     * @type {Boolean}
     * @example @html <ak-dropdown>
     *   <ak-dropdown-trigger disabled>Dropdown trigger</ak-dropdown-trigger>
     * </ak-dropdown>
     * @example @js dropdown.childNodes[0].disabled = true;
     */
    disabled: prop.boolean({
      attribute: true,
    }),
    /**
     * @description opened state of the dropdown's trigger
     * @memberof Dropdown
     * @default false
     * @type {Boolean}
     * @example @html <ak-dropdown>
     *   <ak-dropdown-trigger opened>Dropdown trigger</ak-dropdown-trigger>
     * </ak-dropdown>
     * @example @js dropdown.childNodes[0].opened = true;
     */
    opened: prop.boolean({
      attribute: true,
    }),
    /**
     * @description tabIndex of the dropdown's trigger
     * @memberof Dropdown
     * @default 0
     * @type {Number}
     * @example @html <ak-dropdown>
     *   <ak-dropdown-trigger tab-index="1">Dropdown trigger</ak-dropdown-trigger>
     * </ak-dropdown>
     * @example @js dropdown.childNodes[0].tabIndex = 1;
     */
    tabIndex: prop.number({
      attribute: true,
      default: 0,
    }),
  },
});

export const DropdownTriggerButton = define('ak-dropdown-trigger-button',
  DropdownTrigger.extend({
    render(elem) {
      return (
        <ak-button
          tabIndex={elem.tabIndex}
          onclick={handleClick(elem)}
          onkeydown={handleKeyDown(elem)}
          selected={elem.opened}
          disabled={elem.disabled}
        >
          {elem.getContent()}
        </ak-button>
      );
    },
    prototype: {
      /**
       * HTML Content is generated in this Template method with the intention
       * to ease any content variation of this component, by overriding the `getContent` method.
       * Example: See `DropdownTriggerArrow` subclass
       **/
      getContent() {
        vdom.element('ak-icon', { slot: 'after', glyph: 'expand' });
        vdom.element('slot');
      },
    },
  }));


export const DropdownTriggerArrow = define('ak-dropdown-trigger-arrow',
  DropdownTriggerButton.extend({
    prototype: {
      getContent() {
        vdom.element('ak-icon', { glyph: 'expand' });
      },
    },
  }));
