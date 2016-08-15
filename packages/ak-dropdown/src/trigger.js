import { emit, vdom, define, prop } from 'skatejs';
import shadowTriggerStyles from './shadow-trigger.less';
import classNames from 'classnames';
import keyCode from 'keycode';

function isOnlyOneTextNode(elem) {
  return elem.childNodes && (
      !elem.childNodes.length ||
      (elem.childNodes.length === 1 && elem.childNodes[0].nodeType === 3)
    );
}

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

export default define('ak-dropdown-trigger', {
  render(elem) {
    if (isOnlyOneTextNode(elem)) {
      const classes = classNames(
        [shadowTriggerStyles.locals.trigger, {
          [`${shadowTriggerStyles.locals.disabled}`]: elem.disabled,
          [`${shadowTriggerStyles.locals.opened}`]: elem.opened,
        }]
      );

      return (
        <div
          class={classes}
          on-click={handleClick(elem)}
          on-keydown={handleKeyDown(elem)}
          tabindex="0"
        >
          <style>{shadowTriggerStyles.toString()}</style>
          <slot />
        </div>
      );
    }

    return <slot on-click={handleClick(elem)} />;
  },
  props: {
    disabled: prop.boolean({
      attribute: true,
    }),
    opened: prop.boolean({
      attribute: true,
    }),
  },
});
