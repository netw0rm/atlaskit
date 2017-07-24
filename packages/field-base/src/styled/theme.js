import {
  akColorB100,
  akColorN0,
  akColorN10,
  akColorN20,
  akColorN200,
  akColorN20A,
  akColorN60,
  akColorY300,
} from '@atlaskit/util-shared-styles';

const invalidColor = akColorY300;

export default {
  field: {
    standard: {
      background: {
        default: akColorN10,
        focus: akColorN0,
        hover: akColorN20,
      },
      border: {
        default: akColorN20,
        focus: akColorB100,
        hover: akColorN20,
      },
    },
    disabled: {
      background: {
        default: akColorN20,
        focus: akColorN20,
        hover: akColorN20,
      },
      border: {
        default: akColorN20A,
        focus: akColorN20A,
        hover: akColorN20A,
      },
      text: {
        default: akColorN60,
        focus: akColorN60,
        hover: akColorN60,
      },
    },
    invalid: {
      background: {
        default: akColorN10,
        focus: akColorN0,
        hover: akColorN20,
      },
      border: {
        default: invalidColor,
        hover: invalidColor,
        focus: invalidColor,
      },
    },
    subtle: {
      background: {
        default: 'transparent',
        focus: akColorN0,
        hover: akColorN20,
      },
      border: {
        default: 'transparent',
        focus: akColorB100,
        hover: akColorN20,
      },
    },
    none: {
      background: {
        default: 'transparent',
        focus: 'transparent',
        hover: 'transparent',
      },
      border: {
        default: 'transparent',
        focus: 'transparent',
        hover: 'transparent',
      },
    },
  },

  icon: {
    color: invalidColor,
  },

  label: {
    color: akColorN200,
  },
};
