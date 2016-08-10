import { emit, vdom, define, prop, symbols } from 'skatejs';
import shadowItemStyles from './shadow-item.less';
import classNames from 'classnames';
import keyCode from 'keycode';

function selectItem(item) {
  return () => {
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
  };
}

function handleKeyUp(elem) {
  return (event) => {
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
      default:
        break;
    }
  };
}

export default define('ak-dropdown-item', {
  render(elem) {
    const list = elem.parentNode.childNodes;
    const classes = classNames(
      [shadowItemStyles.locals.item, {
        [`${shadowItemStyles.locals.disabled}`]: elem.isDisabled,
        [`${shadowItemStyles.locals.selected}`]: elem.selected,
        [`${shadowItemStyles.locals.first}`]: list[0] === elem,
        [`${shadowItemStyles.locals.last}`]: list[list.length - 1] === elem,
      }]
    );
    return (
      <div
        tabindex="0"
        class={classes}
        on-keyup={handleKeyUp(elem)}
        on-click={selectItem(elem)}
      >
        <style>{shadowItemStyles.toString()}</style>
        <slot />
      </div>
    );
  },
  rendered(elem) {
    if (elem.focused) {
      elem[symbols.shadowRoot].childNodes[0].focus();
    }
  },
  props: {
    isDisabled: prop.boolean({
      attribute: true,
    }),
    selected: prop.boolean({
      attribute: true,
    }),
    focused: prop.boolean({
      attribute: true,
      set(elem, data) {
        if (data.newValue && elem && elem[symbols.shadowRoot]) {
          elem[symbols.shadowRoot].childNodes[0].focus();
        }
      },
    }),
  },
});
