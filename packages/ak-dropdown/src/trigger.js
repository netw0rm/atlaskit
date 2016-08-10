import { emit, vdom, define, prop } from 'skatejs';
import shadowTriggerStyles from './shadow-trigger.less';
import classNames from 'classnames';
import { KeyPressHandler } from 'akutil-common';

function isOnlyOneTextNode(elem) {
  return elem.childNodes && elem.childNodes.length === 1 && elem.childNodes[0].nodeType === 3;
}

function handleTriggerActivated(elem) {
  return () => {
    emit(elem, 'ak-dropdown-trigger-activated');
  };
}

let keyPress;

export default define('ak-dropdown-trigger', {
  attached(elem) {
    const callback = handleTriggerActivated(elem);
    keyPress = new KeyPressHandler('DOWN', callback, elem);
    keyPress.add('ENTER', callback);
    keyPress.add('SPACE', callback);
  },
  detached() {
    keyPress.destroy();
  },
  render(elem) {
    if (isOnlyOneTextNode(elem)) {
      const classes = classNames(
        [shadowTriggerStyles.locals.trigger, {
          [`${shadowTriggerStyles.locals.disabled}`]: elem.disabled,
          [`${shadowTriggerStyles.locals.opened}`]: elem.opened,
        }]
      );

      return (
        <div class={classes} on-click={handleTriggerActivated(elem)} tabindex="0">
          <style>{shadowTriggerStyles.toString()}</style>
          <slot />
        </div>
      );
    }

    return <slot on-click={handleTriggerActivated(elem)} />;
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
