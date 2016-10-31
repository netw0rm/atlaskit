export const grid = 4;
export const itemHeight = grid * 7;
export const dropdownMaxHeight = (itemHeight * 9.5) + (grid * 2); // ( item height * 9.5 items)
export const dropdownMinWidth = 150;
export const dropdownMaxWidth = 300;

// offset of dropdown from the trigger in pixels "[x-offset] [y-offset]"
export const offset = '0 4';

export const dropdownModeOptions = {
  attribute: 'dropWidth',
  values: ['standart', 'fit', 'tall'],
  missingDefault: 'standart',
  invalidDefault: 'standart',
};
