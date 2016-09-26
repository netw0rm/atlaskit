import { vdom, define, props, emit } from 'skatejs';
import shadowItemStyles from './less/shadow-item.less';
import { unselected as unselectedEvent } from './internal/events';
import keyCode from 'keycode';

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
          onkeydown={elem.handleKeyDownCheckbox(elem)}
          onclick={elem.toggleItem(elem)}
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
    prototype: {
      toggleItem(elem) {
        return () => {
          if (elem.selected) {
            elem.unselectItem(elem)();
          } else {
            elem.selectItem(elem)();
          }
        };
      },
      unselectItem(elem) {
        return () => {
          if (elem.disabled) return;
          emit(elem, unselectedEvent, {
            detail: { item: elem },
          });
        };
      },
      handleKeyDownCheckbox(elem) {
        return (event) => {
          if (elem.selected &&
            (event.keyCode === keyCode('space') || event.keyCode === keyCode('enter'))) {
            elem.unselectItem(elem)(event);
          } else {
            elem.handleKeyDown(elem)(event);
          }
        };
      },
    },
  }));
