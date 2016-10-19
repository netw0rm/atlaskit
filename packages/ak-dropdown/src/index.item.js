import keyCode from 'keycode';

import { emit, vdom, prop, define, props } from 'skatejs';
import { item as itemEvents } from './internal/events';
import shadowItemStyles from './less/shadow-item.less';
import Item from './internal/Item';
import IconContainer from './internal/LeftSlotContainer';
import DefaultSlotContainer from './internal/DefaultSlotContainer';
import childrenHaveSlot from './internal/childrenHaveSlot';


export const elemDom = Symbol('elemDom');
export const BaseProps = {
  /**
   * @description disabled state of a dropdown's item
   * @memberof Dropdown
   * @default false
   * @type {Boolean}
   * @example @html <ak-dropdown>
   *   <ak-dropdown-item disabled>some content</ak-dropdown-item>
   * </ak-dropdown>
   * @example @js dropdownItem.disabled = true;
   */
  disabled: prop.boolean({
    attribute: true,
  }),
  /**
   * @description is this item the first in the list of items
   * @memberof Dropdown
   * @default false
   * @type {Boolean}
   * @example @html <ak-dropdown>
   *   <ak-dropdown-item first>some content</ak-dropdown-item>
   * </ak-dropdown>
   * @example @js dropdownItem.first = true;
   */
  first: prop.boolean({
    attribute: true,
  }),
  /**
   * @description is this item the last in the list of items
   * @memberof Dropdown
   * @default false
   * @type {Boolean}
   * @example @html <ak-dropdown>
   *   <ak-dropdown-item last>some content</ak-dropdown-item>
   * </ak-dropdown>
   * @example @js dropdownItem.last = true;
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
   * @example @js dropdownItem.focused = true;
   */
  focused: prop.boolean({
    attribute: true,
    set(elem, data) {
      if (data.newValue) {
        setTimeout(() => elem[elemDom].focus());
      }
    },
  }),
  /**
   * @description defines whether the item is invisible
   * @memberof Dropdown
   * @default false
   * @type {Boolean}
   * @example @html <ak-dropdown>
   *   <ak-dropdown-item hidden>some content</ak-dropdown-item>
   * </ak-dropdown>
   * @example @js dropdownItem.hidden = true;
   */
  hidden: prop.boolean({
    attribute: true,
  }),
};

export default define('ak-dropdown-item', {
  render(elem) {
    return (
      <Item
        {...props(elem)}
        ref={el => (elem[elemDom] = el)}
        onkeydown={elem.handleKeyDown(elem)}
        onclick={elem.activateItem(elem)}
        role="menuitem"
      >
        <style>{shadowItemStyles.toString()}</style>
        {childrenHaveSlot(elem.childNodes, 'left') ?
          <IconContainer>
            <slot name="left" />
          </IconContainer> :
        null}
        <DefaultSlotContainer>
          <slot />
        </DefaultSlotContainer>
      </Item>
    );
  },
  prototype: {
    activateItem(elem) {
      return () => {
        if (elem.disabled) return;
        emit(elem, itemEvents.activated, {
          detail: { item: elem },
        });
      };
    },
    handleKeyDown(elem) {
      return (event) => {
        switch (event.keyCode) {
          case keyCode('up'):
            event.preventDefault();
            emit(event.target, itemEvents.up);
            break;
          case keyCode('down'):
            event.preventDefault();
            emit(event.target, itemEvents.down);
            break;
          case keyCode('tab'):
            event.preventDefault();
            emit(event.target, itemEvents.tab);
            break;
          case keyCode('space'):
          case keyCode('enter'):
            elem.activateItem(elem)();
            break;
          default:
            break;
        }
      };
    },
  },
  props: Object.assign({
    /**
     * @description href for a dropdown item's link'
     * @memberof Dropdown
     * @default ''
     * @type {String}
     * @example @html <ak-dropdown>
     *   <ak-dropdown-item href="http://google.com">some content</ak-dropdown-item>
     * </ak-dropdown>
     * @example @js dropdownItem.href = 'http://google.com';
     */
    href: prop.string({
      attribute: true,
    }),
    /**
     * @description target for a dropdown item's link
     * @memberof Dropdown
     * @default ''
     * @type {String}
     * @example @html <ak-dropdown>
     *   <ak-dropdown-item href="http://google.com" target="_blank">some content</ak-dropdown-item>
     * </ak-dropdown>
     * @example @js dropdownItem._target = '_blank';
     */
    target: prop.string({
      attribute: true,
    }),
    /**
     * @description active state of a dropdown's item.
     * Set this to true if for some reason you want this particular item to be highlighted
     * @memberof Dropdown
     * @default false
     * @type {Boolean}
     * @example @html <ak-dropdown>
     *   <ak-dropdown-item active>some content</ak-dropdown-item>
     * </ak-dropdown>
     * @example @js dropdownItem.active = true;
     */
    active: prop.boolean({
      attribute: true,
    }),
  }, BaseProps),
});
