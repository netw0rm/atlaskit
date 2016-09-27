import { vdom, define, props } from 'skatejs';
import shadowItemStyles from './less/shadow-item.less';

import DefaultItem, { BaseProps, elemDom } from './index.item';
import Radio from 'ak-icon/glyph/radio';
import Item from './internal/Item';
import IconContainer from './internal/LeftSlotContainer';
import DefaultItemContainer from './internal/DefaultSlotContainer';

export default define('ak-dropdown-item-radio',
  DefaultItem.extend({
    props: Object.assign({}, BaseProps),
    render(elem) {
      const classes = { [shadowItemStyles.locals.selectedWithIcon]: elem.selected };
      return (
        <Item
          {...props(elem)}
          ref={el => (elem[elemDom] = el)}
          onkeydown={elem.handleKeyDown(elem)}
          onclick={elem.selectItem(elem)}
          classes={classes}
          aria-checked={elem.selected}
          role="menuitemradio"
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
