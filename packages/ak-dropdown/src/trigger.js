import { emit, vdom, prop } from 'skatejs';
import shadowTriggerStyles from './shadow-trigger.less';
import classNames from 'classnames';
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
      <div className={classes} tabIndex="0">
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
