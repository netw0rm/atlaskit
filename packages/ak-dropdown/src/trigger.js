import { emit, vdom, prop } from 'skatejs';
import shadowTriggerStyles from './shadow-trigger.less';
import classNames from 'classnames';
import keyCode from 'keycode';

function handleKeyDown(elem) {
  return (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!elem.disabled && [
      keyCode('down'),
      keyCode('space'),
      keyCode('enter')].indexOf(event.keyCode) > -1) {
      emit(elem, 'ak-dropdown-trigger-activated');
    }
  };
}

function handleClick(elem) {
  return (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!elem.disabled) {
      emit(elem, 'ak-dropdown-trigger-activated');
    }
  };
}

// this is a temporary button, in the future dropdown will be able to use a proper button
export const TriggerButtonDefinition = {
  render(elem) {
    const classes = classNames(
      [shadowTriggerStyles.locals.trigger, {
        [`${shadowTriggerStyles.locals.disabled}`]: elem.disabled,
        [`${shadowTriggerStyles.locals.opened}`]: elem.opened,
      }]
    );

    return (
      <div class={classes}>
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
        on-click={handleClick(elem)}
        on-keydown={handleKeyDown(elem)}
        tabindex="0"
      >
        <slot />
      </div>
    );
  },
  props: {
    disabled: prop.boolean({
      attribute: true,
    }),
    opened: prop.boolean({
      attribute: true,
    }),
  },
};
