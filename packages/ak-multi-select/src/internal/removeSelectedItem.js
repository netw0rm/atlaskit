import {
  itemsSymbol,
} from './symbols';

export default (multiSelect, tag) => {
  const deletedItemValue = tag.getAttribute('data-value');
  multiSelect[itemsSymbol] = multiSelect[itemsSymbol].filter((selectedItem) => {
    const isTheOne = selectedItem.value === deletedItemValue;
    if (isTheOne) {
      selectedItem.hidden = false;
      selectedItem.selected = false;
    }
    return !isTheOne;
  });
};
