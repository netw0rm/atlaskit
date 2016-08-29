import { emit, vdom, prop } from 'skatejs';
import shadowItemStyles from './shadow-item.less';
import classNames from 'classnames';
import keyCode from 'keycode';

function selectItem(item) {
  // disabled items should not allow any interactions
  // selected item doesn't need to be selected again
  if (item.disabled || item.selected) {
    return;
  }

  emit(item, 'ak-dropdown-selected', {
    detail: {
      item,
    },
  });
}

function handleKeyDown(elem) {
  return (e) => {
    switch (e.keyCode) {
      case keyCode('up'):
        emit(elem, 'ak-dropdown-item-up');
        break;
      case keyCode('down'):
        emit(elem, 'ak-dropdown-item-down');
        break;
      case keyCode('tab'):
        e.preventDefault();
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
        {/* can't use 'className' here since it's not a custom element property
         and it's transformed into 'classname' */}
        <div class={shadowItemStyles.locals.itemLeftPosition}>
          <slot
            name="left"
            ref={(el) => {
              let hasNodes = false;
              if (el.getAssignedNodes) {
                hasNodes = el.getAssignedNodes().length;
              } else if (el.getDistributedNodes) {
                hasNodes = el.getDistributedNodes().length;
              }

              // I only want this padding if the slot is not empty
              // to avoid double padding in the left
              if (hasNodes) {
                el.parentNode.style.paddingRight = '10px';
              }
            }}
          />
        </div>
        {/* can't use 'className' here since it's not a custom element property
         and it's transformed into 'classname' */}
        <div class={shadowItemStyles.locals.itemDefaultPosition}><slot /></div>
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
