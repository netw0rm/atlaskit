import {
  akColorN10,
  akColorN40,
  akColorN60,
  akColorN300,

  akGridSizeUnitless as spacing,
} from '@atlaskit/util-shared-styles';

export default {
  $: { spacing },

  arrow: {
    color: {
      default: akColorN40,
      selected: akColorN300,
      hover: akColorN60,
    },
  },
  tr: {
    background: {
      hover: akColorN10,
    },
  },
  th: {
    border: {
      color: akColorN40,
    },
    text: {
      color: akColorN300,
    },
  },
};
