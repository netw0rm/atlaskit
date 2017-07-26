import { addThemeComponent } from '../../theme/src';

addThemeComponent('website', (mode, theme) => (mode === 'dark'
? {
  footer: {
    background: {
      normal: theme.colors.DN50,
      hover: theme.colors.DN60,
    },
  },
  example: {
    wrapper: {
      background: {
        normal: {
          normal: theme.colors.DN50,
          hover: theme.colors.DN60,
        },
        open: {
          normal: theme.colors.DN600,
          hover: theme.colors.DN700,
        },
      },
    },
    toggle: {
      normal: theme.colors.DN600,
      open: theme.colors.DN50,
    },
    code: {
      background: theme.colors.DN800,
      text: theme.colors.DN60,
    },
  },
  propdocs: {},
  page: {},
  nav: {},
} : {
  footer: {
    background: {
      normal: theme.colors.N20,
      hover: theme.colors.N30,
    },
  },
  example: {
    wrapper: {
      background: {
        normal: {
          normal: theme.colors.N20,
          hover: theme.colors.N30,
        },
        open: {
          normal: theme.colors.N600,
          hover: theme.colors.N700,
        },
      },
    },
    toggle: {
      normal: theme.colors.N600,
      open: theme.colors.N0,
    },
    code: {
      background: theme.colors.N800,
      text: theme.colors.N60,
    },
  },
  propdocs: {},
  page: {},
  nav: {},
}));
