const filterItems = (items, filterValue, selectedItems) => {
  const value = filterValue;
  const trimmedValue = value && value.toLowerCase().trim();
  const selectedValues = selectedItems.map(item => item.value);
  const unselectedItems = items.filter(item => selectedValues.indexOf(item.value) === -1);

  return trimmedValue ?
    unselectedItems.filter(item => (item.content.toLowerCase().indexOf(trimmedValue) > -1)) :
    unselectedItems;
};

const getNextFocusable = (indexItem, length) => {
  let currentItem = indexItem;

  if (currentItem === null) {
    currentItem = 0;
  } else if (currentItem < length) {
    currentItem++;
  } else {
    currentItem = 0;
  }

  return currentItem;
};

const getPrevFocusable = (indexItem, length) => {
  let currentItem = indexItem;

  if (currentItem > 0) {
    currentItem--;
  } else {
    currentItem = length;
  }

  return currentItem;
};

export {
  filterItems,
  getNextFocusable,
  getPrevFocusable,
};
