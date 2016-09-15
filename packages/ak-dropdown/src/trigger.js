import { emit, vdom, prop, define } from 'skatejs';
import shadowTriggerStyles from './shadow-trigger.less';
import classNames from 'classnames';
import keyCode from 'keycode';
import { trigger as triggerEvents } from './internal/events';

function handleKeyDown(elem) {
  return (e) => {
    if (!elem.disabled && [
      keyCode('down'),
      keyCode('space'),
      keyCode('enter')].indexOf(e.keyCode) > -1) {
      emit(elem, triggerEvents.activated);
    }
  };
}

function handleClick(elem) {
  return () => {
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
  class extends DropdownTrigger {
    static render(elem) {
      const classes = classNames(
        [shadowTriggerStyles.locals.trigger, {
          [shadowTriggerStyles.locals.disabled]: elem.disabled,
          [shadowTriggerStyles.locals.opened]: elem.opened,
        }]
      );
      return (
        <div
          className={classes}
          tabIndex={elem.tabIndex}
          onclick={handleClick(elem)}
          onkeydown={handleKeyDown(elem)}
        >
          <style>{shadowTriggerStyles.toString()}</style>
          <slot />
        </div>
      );
    }
  }
);
