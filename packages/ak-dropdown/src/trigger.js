import { emit, vdom, define, prop } from 'skatejs';
import shadowTriggerStyles from './shadow-trigger.less';
import classNames from 'classnames';
// import { KeyPressHandler } from 'akutil-common';

function isOnlyOneTextNode(elem) {
  return elem.childNodes && elem.childNodes.length === 1 && elem.childNodes[0].nodeType === 3;
}

function handleTriggerClick(elem) {
  return () => {
    emit(elem, 'ak-dropdown-trigger-click');
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
        <div class={classes} on-click={handleTriggerClick(elem)}>
          <style>{shadowTriggerStyles.toString()}</style>
          <slot />
        </div>
      );
    }

    return <slot on-click={handleTriggerClick(elem)} />;
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
