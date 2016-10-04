import {
  itemsSymbol,
} from './symbols';

export default (multiSelect, selectItem) => {
  selectItem.hidden = true;
  selectItem.selected = true;
  multiSelect[itemsSymbol] = multiSelect[itemsSymbol].concat(selectItem);
};
