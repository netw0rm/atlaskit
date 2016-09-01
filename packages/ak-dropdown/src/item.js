import { emit, vdom, prop } from 'skatejs';
import shadowItemStyles from './shadow-item.less';
import classNames from 'classnames';
import keyCode from 'keycode';
import { selected as selectedEvent, item as itemEvents } from './internal/events';

function selectItem(item) {
  // disabled items should not allow any interactions
  // selected item doesn't need to be selected again
  if (item.disabled || item.selected) {
    return;
  }

  emit(item, selectedEvent, {
    detail: {
      item,
    },
  });
}

function handleKeyDown(elem) {
  return (e) => {
    switch (e.keyCode) {
      case keyCode('up'):
        emit(elem, itemEvents.up);
        break;
      case keyCode('down'):
        emit(elem, itemEvents.down);
        break;
      case keyCode('tab'):
        e.preventDefault();
        emit(elem, itemEvents.tab);
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

function childHasLeftSlot(list) {
  let hasSlot = false;
  list.forEach((el) => {
    if (el.getAttribute && el.getAttribute('slot') === 'left') {
      hasSlot = true;
    }
  });

  return hasSlot;
}

export default {
  render(elem) {
    const classes = classNames(
      [shadowItemStyles.locals.item, {
        [shadowItemStyles.locals.disabled]: elem.disabled,
        [shadowItemStyles.locals.selected]: elem.selected,
        [shadowItemStyles.locals.first]: elem.first,
        [shadowItemStyles.locals.last]: elem.last,
      }]
    );
    const tabIndex = elem.selected ? '1' : '0';
    const renderLeftSlot = childHasLeftSlot(elem.childNodes);

    return (
      <a
        tabindex={tabIndex}
        className={classes}
        onkeydown={handleKeyDown(elem)}
        onclick={() => selectItem(elem)}
        ref={el => (elem.item = el)}
        aria-disabled={elem.disabled}
        aria-selected={elem.selected}
        href={elem.href ? elem.href : void 0}
      >
        <style>{shadowItemStyles.toString()}</style>
        {renderLeftSlot ? <div className={shadowItemStyles.locals.itemLeftPosition}>
          <slot name="left" />
        </div> : null}
        <div className={shadowItemStyles.locals.itemDefaultPosition}><slot /></div>
      </a>
    );
  },
  rendered(elem) {
    if (elem.focused) {
      setTimeout(() => elem.item.focus());
    }
  },
  props: {
    /**
     * @description disabled state of a dropdown's item
     * @memberof Dropdown
     * @default false
     * @type {Boolean}
     * @example @html <ak-dropdown>
     *   <ak-dropdown-item disabled>some content</ak-dropdown-item>
     * </ak-dropdown>
     * @example @js dropdown.childNodes[0].disabled = true;
     */
    disabled: prop.boolean({
      attribute: true,
    }),
    /**
     * @description selected state of a dropdown's item
     * @memberof Dropdown
     * @default false
     * @type {Boolean}
     * @example @html <ak-dropdown>
     *   <ak-dropdown-item selected>some content</ak-dropdown-item>
     * </ak-dropdown>
     * @example @js dropdown.childNodes[0].selected = true;
     */
    selected: prop.boolean({
      attribute: true,
    }),
    /**
     * @description is this item is first in the list of items
     * @memberof Dropdown
     * @default false
     * @type {Boolean}
     * @example @html <ak-dropdown>
     *   <ak-dropdown-item first>some content</ak-dropdown-item>
     * </ak-dropdown>
     * @example @js dropdown.childNodes[0].first = true;
     */
    first: prop.boolean({
      attribute: true,
    }),
    /**
     * @description is this item is last in the list of items
     * @memberof Dropdown
     * @default false
     * @type {Boolean}
     * @example @html <ak-dropdown>
     *   <ak-dropdown-item last>some content</ak-dropdown-item>
     * </ak-dropdown>
     * @example @js dropdown.childNodes[0].last = true;
     */
    last: prop.boolean({
      attribute: true,
    }),
    /**
     * @description focused state of a dropdown's item
     * @memberof Dropdown
     * @default false
     * @type {Boolean}
     * @example @html <ak-dropdown>
     *   <ak-dropdown-item focused>some content</ak-dropdown-item>
     * </ak-dropdown>
     * @example @js dropdown.childNodes[0].focused = true;
     */
    focused: prop.boolean({
      attribute: true,
    }),
    href: prop.string({
      attribute: true,
    }),
  },
};
