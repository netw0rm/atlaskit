import { colors, themed } from '@atlaskit/theme';

const invalidColor = colors.Y300;

const getBackgroundColor = themed('appearance', {

})

const field = themed('appearance', {
  standard: {
    background: {
      default: colors.N10,
      focus: colors.N0,
      hover: colors.N20,
    },
    border: {
      default: colors.N20,
      focus: colors.B100,
      hover: colors.N20,
    },
  },
  disabled: {
    background: {
      default: colors.N20,
      focus: colors.N20,
      hover: colors.N20,
    },
    border: {
      default: colors.N20A,
      focus: colors.N20A,
      hover: colors.N20A,
    },
    text: {
      default: colors.N60,
      focus: colors.N60,
      hover: colors.N60,
    },
  },
  invalid: {
    background: {
      default: colors.N10,
      focus: colors.N0,
      hover: colors.N20,
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
      focus: colors.N0,
      hover: colors.N20,
    },
    border: {
      default: 'transparent',
      focus: colors.B100,
      hover: colors.N20,
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
});

export default {
  field: {
    standard: {
      background: {
        default: colors.N10,
        focus: colors.N0,
        hover: colors.N20,
      },
      border: {
        default: colors.N20,
        focus: colors.B100,
        hover: colors.N20,
      },
    },
    disabled: {
      background: {
        default: colors.N20,
        focus: colors.N20,
        hover: colors.N20,
      },
      border: {
        default: colors.N20A,
        focus: colors.N20A,
        hover: colors.N20A,
      },
      text: {
        default: colors.N60,
        focus: colors.N60,
        hover: colors.N60,
      },
    },
    invalid: {
      background: {
        default: colors.N10,
        focus: colors.N0,
        hover: colors.N20,
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
        focus: colors.N0,
        hover: colors.N20,
      },
      border: {
        default: 'transparent',
        focus: colors.B100,
        hover: colors.N20,
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
    color: colors.N200,
  },
};
