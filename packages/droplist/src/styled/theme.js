// @flow

import {
  akBorderRadius as borderRadius,
  akGridSizeUnitless as spacing,

  akColorB100,
  akColorB400,
  akColorB75,
  akColorN0,
  akColorN20,
  akColorN200,
  akColorN300,
  akColorN50,
  akColorN50A,
  akColorN60A,
  akColorN70,
  akColorN800,
} from '@atlaskit/util-shared-styles';

export default {
  $: { borderRadius, spacing },

  Content: {
    background: akColorN0,
    boxShadow: `
      0 ${spacing / 2}px ${spacing}px -${spacing / 4}px ${akColorN50A},
      0 0 1px ${akColorN60A}
    `,
  },
  Group: {
    heading: {
      text: akColorN300,
    },
  },
  Item: {
    background: {
      active: akColorB75,
      hover: akColorN20,
      default: akColorN0,
      disabled: akColorN0,
      selected: akColorN0,
    },
    boxShadow: {
      focus: akColorB100,
    },
    fontSize: '14px',
    padding: {
      x: spacing * 1.5,
      y: spacing,
    },
    primaryText: {
      active: akColorN800,
      default: akColorN800,
      disabled: akColorN70,
      hover: akColorN800,
      primary: akColorB400,
      selected: akColorN800,
    },
    secondaryText: {
      active: akColorN200,
      default: akColorN200,
      disabled: akColorN50,
      selected: akColorN200,
      hover: akColorN200,
    },
  },
};
