import { addThemeComponent } from '../../../../theme/src';

addThemeComponent('dynamicProps', (mode, theme) => (mode === 'dark'
? {
  heading: {
    borderColor: theme.colors.DN40,
    defaultValue: theme.colors.subtleText,
    required: theme.colors.R300,
    type: {
      background: theme.colors.B500,
      text: theme.colors.B50,
    },
  },
  types: {
    base: {
      background: theme.colors.P500,
      text: theme.colors.P50,
    },
    meta: {
      background: theme.colors.DN50,
      text: theme.colors.subtleText,
    },
    string: {
      background: theme.colors.G500,
      text: theme.colors.G100,
    },
    instance: {
      background: theme.colors.G500,
      text: theme.colors.G100,
    },
    required: theme.colors.R300,
    outline: theme.colors.subtleText,
    invalid: theme.colors.DN80,
  },
} : {
  heading: {
    borderColor: theme.colors.N20,
    defaultValue: theme.colors.subtleText,
    required: theme.colors.R500,
    type: {
      background: theme.colors.B50,
      text: theme.colors.B500,
    },
  },
  types: {
    base: {
      background: theme.colors.P50,
      text: theme.colors.P500,
    },
    meta: {
      background: theme.colors.N20,
      text: theme.colors.subtleText,
    },
    string: {
      background: theme.colors.G50,
      text: theme.colors.G500,
    },
    instance: {
      background: theme.colors.Y50,
      text: theme.colors.Y500,
    },
    required: theme.colors.R500,
    outline: theme.colors.subtleText,
    invalid: theme.colors.N80,
  },
}));
