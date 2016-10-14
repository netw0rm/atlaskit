import { emit, vdom, prop, define } from 'skatejs';
import 'ak-button';
import 'ak-icon/glyph/expand';
import keyCode from 'keycode';
import { trigger as triggerEvents } from './internal/events';
import shadowTriggerStyles from './less/shadow-trigger.less';

function handleKeyDown(elem) {
  return (e) => {
    if (!elem.disabled && [
      keyCode('down'),
      keyCode('space'),
      keyCode('enter')].indexOf(e.keyCode) > -1) {
      emit(elem, triggerEvents.activated, {
        detail: { eventType: 'keyDown' },
      });
    }
  };
}

function handleClick(elem) {
  return () => {
    if (!elem.disabled) {
      emit(elem, triggerEvents.activated, {
        detail: { eventType: 'click' },
      });
    }
  };
}
export const DropdownTrigger = define('ak-dropdown-trigger', {
  render(elem) {
    return (
      <div
        onclick={handleClick(elem)}
        onkeydown={handleKeyDown(elem)}
      >
        <style>{shadowTriggerStyles.toString()}</style>
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
  },
});

export const DropdownTriggerButton = define('ak-dropdown-trigger-button',
  DropdownTrigger.extend({
    render(elem) {
      return (
        <ak-button
          onclick={handleClick(elem)}
          onkeydown={handleKeyDown(elem)}
          selected={elem.opened}
          disabled={elem.disabled}
        >
          <style>{shadowTriggerStyles.toString()}</style>
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
        vdom.element('ak-icon-expand', { slot: 'after' });
        vdom.element('slot');
      },
    },
  }));


export const DropdownTriggerArrow = define('ak-dropdown-trigger-arrow',
  DropdownTriggerButton.extend({
    prototype: {
      getContent() {
        vdom.element('ak-icon-expand');
      },
    },
  }));
