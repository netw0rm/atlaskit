/** @jsx vdom */
import 'style!./host.less';

import { emit, vdom, define, prop, symbols } from 'skatejs';
import shadowListStyles from './shadow-list.less';
import shadowItemStyles from './shadow-item.less';
import shadowTriggerStyles from './shadow-trigger.less';
import 'ak-layer';
import classNames from 'classnames';
import { KeyPressHandler } from 'akutil-common';

const listWidthGap = 10;

function isOnlyOneTextNode(elem) {
  return elem.childNodes && elem.childNodes.length === 1 && elem.childNodes[0].nodeType === 3;
}

function handleTriggerClick(elem) {
  return () => {
    emit(elem, 'ak-dropdown-trigger-click');
  };
}

function selectItem(elem, list) {
  return () => {
    // disabled items should not allow any interactions
    // selected item doesn't need to be selected again
    if (elem.disabled || elem.selected) {
      return;
    }
    list.forEach((child) => {
      child.selected = false;
    });
    elem.selected = true;
    emit(elem, 'ak-dropdown-selected');
  };
}

define('ak-dropdown-trigger', {
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

define('ak-dropdown-item', {
  render(elem) {
    const list = elem.parentNode[symbols.shadowRoot].querySelectorAll('ak-dropdown-item');

    const classes = classNames(
      [shadowItemStyles.locals.item, {
        [`${shadowItemStyles.locals.disabled}`]: elem.disabled,
        [`${shadowItemStyles.locals.selected}`]: elem.selected,
        [`${shadowItemStyles.locals.first}`]: list[0] === elem,
        [`${shadowItemStyles.locals.last}`]: list[list.length - 1] === elem,
      }]
    );
    return (
      <div class={classes} on-click={selectItem(elem, list)}>
        <style>{shadowItemStyles.toString()}</style>
        <slot />
      </div>
    );
  },
  props: {
    disabled: prop.boolean({
      attribute: true,
    }),
    selected: prop.boolean({
      attribute: true,
    }),
  },
});

define('ak-dropdown-list', {
  render(elem) {
    if (!elem.open) {
      return '';
    }

    let target = elem.parentNode.querySelector('ak-dropdown-trigger');
    target = target[symbols.shadowRoot].firstChild;

    const styles = {
      minWidth: `${target.getBoundingClientRect().width + listWidthGap}px`,
    };

    return (
      <ak-layer
        position="bottom left"
        target={target}
        ref={(layer) => {
          setTimeout(() => {
            if (elem.open && layer.alignment) {
                // by default dropdown has opacity 0
                // and only with attribute 'positioned' it has opacity 1
                // this behavior is to avoid 'flashing' of dropdown
                // when it's initially positioning itself on a page
              elem.setAttribute('positioned', true);
            }
          }, 10);
        }
        }
      >
        <div className={shadowListStyles.locals.list} style={styles}>
          <style>{shadowListStyles.toString()}</style>
          <slot />
        </div>
      </ak-layer>
    );
  },
  props: {
    open: prop.boolean({
      attribute: true,
    }),
  },
});

let keyPress;
function isChildOf(child, parent) {
  if (child.parentNode === parent) {
    return true;
  } else if (child.parentNode === null) {
    return false;
  }

  return isChildOf(child.parentNode, parent);
}

function closeDropdown(trigger, list) {
  return () => {
    list.open = false;
    trigger.opened = false;
  };
}

function handleClickOutside(trigger, list, elem) {
  return (e) => {
    if (e.target !== elem && !isChildOf(e.target, elem)) {
      closeDropdown(trigger, list)();
    }
  };
}

export default define('ak-dropdown', {
  attached(elem) {
    const list = elem[symbols.shadowRoot].querySelector('ak-dropdown-list');
    const trigger = elem[symbols.shadowRoot].querySelector('ak-dropdown-trigger');

    elem.addEventListener('ak-dropdown-trigger-click', () => {
      list.open = !list.open;
      trigger.opened = list.open;
    });

    keyPress = new KeyPressHandler('ESCAPE', closeDropdown(trigger, list));
    document.addEventListener('click', handleClickOutside(trigger, list, elem));
  },
  detached() {
    keyPress.destroy();
    document.removeEventListener('click', handleClickOutside);
  },
  render() {
    return (
      <slot />
    );
  },
});
