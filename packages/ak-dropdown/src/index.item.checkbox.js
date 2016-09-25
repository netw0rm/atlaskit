import { vdom, define, props } from 'skatejs';
import shadowItemStyles from './less/shadow-item.less';

import DefaultItem, { BaseProps } from './index.item';
import Checkbox from 'ak-icon/glyph/checkbox';
import Item from './internal/Item';
import IconContainer from './internal/LeftSlotContainer';
import DefaultItemContainer from './internal/DefaultSlotContainer';

export default define('ak-dropdown-item-checkbox',
  DefaultItem.extend({
    props: Object.assign({}, BaseProps),
    render(elem) {
      const classes = { [shadowItemStyles.locals.selectedWithIcon]: elem.selected };
      return (
        <Item
          {...props(elem)}
          ref={el => (elem.elemDom = el)}
          onkeydown={elem.handleKeyDown(elem)}
          onclick={elem.selectItem(elem)}
          classes={classes}
        >
          <style>{shadowItemStyles.toString()}</style>
          <IconContainer>
            <Checkbox />
          </IconContainer>
          <DefaultItemContainer>
            <slot />
          </DefaultItemContainer>
        </Item>
      );
    },
  }));
