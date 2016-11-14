import { vdom, define, prop } from 'skatejs';
import { events as tagEvents } from 'ak-tag';
import Dropdown,
{
  Item as DropdownItem, Group as DropdownGroup, events as dropdownEvents,
} from 'ak-dropdown';

import * as events from './internal/events';

/* templates */
import MultiSelectTrigger from './templates/MultiSelectTrigger';
import SelectedItemsContainer from './templates/SelectedItemsContainer';

/* helper functions */
import removeSelectedItem from './internal/removeSelectedItem';
import selectItem from './internal/selectItem';

import {
  itemsSymbol,
  dropdownSymbol,
} from './internal/symbols';

export default define('ak-multi-select', {
  created(elem) {
    elem.addEventListener(tagEvents.afterRemove, (e) => {
      removeSelectedItem(elem, e.detail.item);
    });

    elem.addEventListener(dropdownEvents.changeBefore, (e) => {
      selectItem(elem, e.detail);
    });
  },
  render(elem) {
    return (
      <Dropdown
        ref={drop => (elem[dropdownSymbol] = drop)}
        appearance="fitwidth"
        style={{ display: 'flex', width: '100%' }} // can't move this into classes, since :host in the dropdown trumps everything, even !important
      >
        <MultiSelectTrigger>
          <SelectedItemsContainer items={elem[itemsSymbol]} />
        </MultiSelectTrigger>
        <slot />
      </Dropdown>
    );
  },
  props: {
    [itemsSymbol]: prop.array({
      initial: [],
    }),
  },
});

export const Item = define('ak-multi-select-item', DropdownItem.extend({
  props: Object.assign({
    value: prop.string({
      attribute: true,
    }),
    selected: prop.boolean({
      attribute: true,
    }),
  }, DropdownItem.props),
}));
export const Group = define('ak-multi-select-group', class extends DropdownGroup {});
export { events };
