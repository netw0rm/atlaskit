import { vdom, define, props, prop } from 'skatejs';
import shadowItemStyles from './less/shadow-item.less';

import DefaultItem, { BaseProps, elemDom } from './index.item';
import Radio from 'ak-icon/glyph/radio';
import Item from './internal/Item';
import IconContainer from './internal/LeftSlotContainer';
import DefaultItemContainer from './internal/DefaultSlotContainer';
import supportsVoiceOver from './internal/supportsVoiceOver';

export default define('ak-dropdown-item-radio',
  DefaultItem.extend({
    props: Object.assign({
      /**
       * @description checked state of the item.
       * @memberof Dropdown
       * @default false
       * @type {Boolean}
       * @example @html <ak-dropdown>
       *   <ak-dropdown-item checked>some content</ak-dropdown-item>
       * </ak-dropdown>
       * @example @js dropdownItem.checked = true;
       */
      checked: prop.boolean({
        attribute: true,
      }),
    }, BaseProps),
    render(elem) {
      const classes = { [shadowItemStyles.locals.activeWithIcon]: elem.checked };
      return (
        <Item
          {...props(elem)}
          ref={el => (elem[elemDom] = el)}
          onkeydown={elem.handleKeyDown(elem)}
          onclick={elem.activateItem(elem)}
          classes={classes}
          aria-checked={elem.checked ? 'true' : 'false'}
          role={supportsVoiceOver ? 'radio' : 'menuitemradio'}
        >
          <style>{shadowItemStyles.toString()}</style>
          <IconContainer>
            <Radio />
          </IconContainer>
          <DefaultItemContainer>
            <slot />
          </DefaultItemContainer>
        </Item>
      );
    },
  }));
