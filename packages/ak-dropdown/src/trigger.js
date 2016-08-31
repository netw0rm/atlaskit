import { emit, vdom, prop } from 'skatejs';
import shadowTriggerStyles from './shadow-trigger.less';
import classNames from 'classnames';
import keyCode from 'keycode';
import EVENTS from './internal/events';

function handleKeyDown(elem) {
  return (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!elem.disabled && [
      keyCode('down'),
      keyCode('space'),
      keyCode('enter')].indexOf(e.keyCode) > -1) {
      emit(elem, EVENTS.TRIGGER_ACTIVATED);
    }
  };
}

function handleClick(elem) {
  return (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!elem.disabled) {
      emit(elem, EVENTS.TRIGGER_ACTIVATED);
    }
  };
}

// this is a temporary button, in the future dropdown will be able to use a proper button
export const TriggerButtonDefinition = {
  render(elem) {
    const classes = classNames(
      [shadowTriggerStyles.locals.trigger, {
        [shadowTriggerStyles.locals.disabled]: elem.disabled,
        [shadowTriggerStyles.locals.opened]: elem.opened,
      }]
    );

    return (
      <div className={classes}>
        <style>{shadowTriggerStyles.toString()}</style>
        <slot />
      </div>
    );
  },
  props: {
    opened: prop.boolean({
      attribute: true,
    }),
  },
};
export default {
  render(elem) {
    return (
      <div
        onclick={handleClick(elem)}
        onkeydown={handleKeyDown(elem)}
        tabindex="0"
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
  },
};
