import { emit, vdom, define, prop } from 'skatejs';
import shadowItemStyles from './shadow-item.less';
import classNames from 'classnames';
import keyCode from 'keycode';

function selectItem(item) {
  // disabled items should not allow any interactions
  // selected item doesn't need to be selected again
  if (item.isDisabled || item.selected) {
    return;
  }

  emit(item, 'ak-dropdown-selected', {
    detail: {
      item,
    },
  });
}

function handleKeyDown(elem) {
  return (event) => {
    event.preventDefault();
    event.stopPropagation();
    switch (event.keyCode) {
      case keyCode('up'):
        emit(elem, 'ak-dropdown-item-up');
        break;
      case keyCode('down'):
        emit(elem, 'ak-dropdown-item-down');
        break;
      case keyCode('tab'):
        emit(elem, 'ak-dropdown-item-tab');
        break;
      case keyCode('space'):
      case keyCode('enter'):
        selectItem(elem);
        break;
      default:
        break;
    }
  };
}

export default define('ak-dropdown-item', {
  render(elem) {
    const classes = classNames(
      [shadowItemStyles.locals.item, {
        [`${shadowItemStyles.locals.disabled}`]: elem.isDisabled,
        [`${shadowItemStyles.locals.selected}`]: elem.selected,
        [`${shadowItemStyles.locals.first}`]: elem.first,
        [`${shadowItemStyles.locals.last}`]: elem.last,
      }]
    );
    const tabIndex = elem.selected ? '1' : '0';

    return (
      <div
        tabindex={tabIndex}
        class={classes}
        on-keydown={handleKeyDown(elem)}
        on-click={() => selectItem(elem)}
        ref={el => (elem.item = el)}
        aria-disabled={elem.isDisabled}
        aria-selected={elem.selected}
      >
        <style>{shadowItemStyles.toString()}</style>
        <slot />
      </div>
    );
  },
  rendered(elem) {
    if (elem.focused) {
      elem.item.focus();
    }
  },
  props: {
    // can't use disable, since skate would prevent bubbling,
    // which I need in order to inform parent that an element is focused
    isDisabled: prop.boolean({
      attribute: true,
    }),
    selected: prop.boolean({
      attribute: true,
    }),
    first: prop.boolean({
      attribute: true,
    }),
    last: prop.boolean({
      attribute: true,
    }),
    focused: prop.boolean({
      attribute: true,
      set(elem, data) {
        if (data.newValue && elem && elem.item) {
          elem.item.focus();
        }
      },
    }),
  },
});
