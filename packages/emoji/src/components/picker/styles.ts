import { style } from 'typestyle';
import {
  akBorderRadius,
  akColorB100,
  akColorB300,
  akColorN100A,
  akColorN200,
  akColorN30,
  akColorN30A,
  akColorN50,
  akColorN900,
} from '@atlaskit/util-shared-styles';

import {
  emojiFooterBoxShadow,
  emojiPickerBorderColor,
  emojiPickerBoxShadow,
  emojiPickerHeight,
  emojiPickerListHeight,
  emojiPickerWidth,
} from '../../shared-styles';

export const emojiPickerFooter = style({
  borderTop: `2px solid ${akColorN30A}`,
  boxShadow: emojiFooterBoxShadow,
});

export const emojiPickerRow = style({
  boxSizing: 'border-box',
  padding: '0 8px',
});

export const emojiPickerCategoryTitle = style({
  boxSizing: 'border-box',
  color: akColorN900,
  fontSize: '14px',
  padding: '5px 8px',
  textTransform: 'lowercase',

  $nest: {
    ['&:first-letter']: {
      textTransform: 'uppercase',
    },
  },
});

export const active = 'active';
export const disable = 'disable';

export const category = style({
  backgroundColor: 'transparent',
  border: 0,
  color: akColorN100A,
  cursor: 'pointer',
  margin: '0 3px 0 4px',
  padding: 0,
  transition: 'color 0.2s ease',

  $nest: {
    [`&.${active}`]: {
      color: akColorB300,

      $nest: {
        ['&:hover']: {
          color: akColorB300,
        },
      },
    },

    ['&:hover']: {
      color: akColorB100,
    },

    [`&.${disable}`]: {
      color: akColorN50,
      cursor: 'default',

      $nest: {
        [':hover']: {
          color: akColorN50,
        },
      },
    },

    ['&:focus']: {
      outline: '0',
    },
  },
});

export const addButton = 'add-button';

export const categorySelector = style({
  backgroundColor: akColorN30,

  $nest: {
    ul: {
      listStyle: 'none',
      margin: '0 3px',
      padding: '3px 0',
    },

    li: {
      display: 'inline-block',
      margin: '4px 0 0 0',
      verticalAlign: 'middle',
    },

    [`.${addButton}`]: {
      color: akColorN200,
      margin: '0 0 0 5px',
    },
  },
});

export const searchIcon = 'search-icon';
export const input = 'input';

export const pickerSearch = style({
  boxSizing: 'border-box',
  padding: '10px 8px',

  $nest: {
    [`.${searchIcon}`]: {
      opacity: .5,
      paddingTop: '2px',
    },

    [`.${input}`]: {
      background: 'transparent',
      border: 0,
      boxSizing: 'border-box',
      color: 'inherit',
      cursor: 'inherit',
      fontSize: '14px',
      outline: 'none',
      padding: '0 0 0 12px',
      width: '100%',

      $nest: {
        ['&:invalid']: {
          boxShadow: 'none',
        },
      },
    },
  },
});

export const emojiPickerList = style({
  height: `${emojiPickerListHeight}px`,
});

export const emojiPicker = style({
  background: 'white',
  border: `${emojiPickerBorderColor} 1px solid`,
  borderRadius: akBorderRadius,
  boxShadow: emojiPickerBoxShadow,
  height: `${emojiPickerHeight}px`,
  width: `${emojiPickerWidth}px`,
});

const spinnerSize = 30;

export const listSizes = {
  emoji: 40,
  search: 50,
  category: 25,
  default: 20,
};

export const emojiPickerSpinnerContainer = style({
  position: 'relative',
  zIndex: 1,
});

export const emojiPickerSpinner = style({
  position: 'absolute',
  left: `${((emojiPickerWidth - spinnerSize) / 2).toFixed()}px`,
  top: `${((emojiPickerListHeight - spinnerSize + listSizes.search) / 2).toFixed()}px`,
});

export const emojiCategoryTitle = style({
  boxSizing: 'border-box',
  color: akColorN900,
  fontSize: '14px',
  padding: '5px 8px',
  textTransform: 'lowercase',

  $nest: {
    '&:first-letter': {
      textTransform: 'uppercase'
    }
  }
});
