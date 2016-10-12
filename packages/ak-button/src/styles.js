import _get from 'lodash.get';
import {
  akBorderRadius,
  akColorN20,
  akColorN30,
  akColorB200,
  akColorB50,
  akColorN500,
  akColorB400,
  akColorB500,
  akColorB300,
  akColorN700,
  akColorN40,
} from 'akutil-shared-styles';

const lineHeight = 20;
const em = 14;
const grid = 8;

const transitionValue = `
  background 0.1s
  ease-out,
  box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38)
`;

const calc = (vars, path, defaultValue) => _get(vars, path) || defaultValue;

export default vars => (
  {
    // light DOM styles
    ':host': {
      display: 'inline-block',
    },
    ':host(> _shadow_root_)': {
      display: 'inline-block',
    },
    ':host([disabled])': {
      'pointer-events': 'none',
    },
    // shadow DOM styles
    '::slotted([slot="before"])': {
      'margin-right': `${grid}px`,
    },
    '::slotted([slot="after"])': {
      'margin-left': `${grid}px`,
    },
    'before-slot-wrapper': {
      'align-self': 'center',
      display: 'flex',
    },
    'after-slot-wrapper': {
      'align-self': 'center',
      display: 'flex',
    },
    'button-content': {
      'align-items': 'baseline',
      display: 'inline-flex',
      'flex-wrap': 'nowrap',
    },
    'before-slot': {
      display: 'inline-flex',
    },
    'after-slot': {
      display: 'inline-flex',
    },
    'default-slot': {
      display: 'inline-flex',
    },
    root: {
      display: 'inline-block',
    },
    button: {
      'box-sizing': 'border-box',
      background: calc(vars, 'standard.background', akColorN20),
      'border-width': '0',
      'border-radius': calc(vars, 'button.baseRadius', akBorderRadius),
      color: calc(vars, 'standard.color', akColorN500),
      display: 'inline-block',
      'font-style': 'normal',
      'font-size': 'inherit',
      height: calc(vars, 'button.height', `${grid * 4 / em}em`),
      'line-height': calc(vars, 'button.lineHeight', lineHeight / em),
      margin: '0',
      outline: 'none',
      padding: calc(vars, 'button.padding', `${grid * 0.75}px ${grid}px`),
      'text-align': 'center',
      transition: calc(vars, 'button.transition', transitionValue),
      'user-select': 'none',
      border: calc(vars, 'button.border', 'none'),

      '&::-moz-focus-inner': {
        margin: 0,
        padding: 0,
        border: 0,
      },

      '&:hover': {
        background: calc(vars, 'standard.hover.background', akColorN30),
        cursor: 'pointer',
        'border-color': calc(vars, 'standard.hover.borderColor'),
      },

      '&:active': {
        background: calc(vars, 'standard.active.background', akColorB50),
        'box-shadow': calc(vars, 'standard.active.boxShadow'),
        'transition-duration': calc(vars, 'standard.active.transitionDuration', '0s'),
      },

      '&:focus': {
        'box-shadow': `0 0 0 2px ${calc(vars, 'standard.focus.background', akColorB200)}`,
        'transition-duration': calc(vars, 'standard.focus.transitionDuration', '0s, 0.2s'),
      },
    },
    primary: {
      background: calc(vars, 'primary.background', akColorB400),
      color: calc(vars, 'primary.color', akColorN20),
      'border-color': calc(vars, 'primary.borderColor'),

      '&:hover': {
        background: calc(vars, 'primary.hover.background', akColorB500),
        'border-color': calc(vars, 'primary.borderColor'),
      },

      '&:active': {
        background: calc(vars, 'primary.active.background', akColorB300),
      },
    },
    subtle: {
      background: 'none',
      color: calc(vars, 'subtle.color'),
      'border-color': calc(vars, 'subtle.borderColor'),
      '&:hover': {
        color: calc(vars, 'subtle.hover.color'),
      },
    },
    disabled: {
      color: calc(vars, 'disabled.color', akColorN40),
      '::slotted(*)': { 'pointer-events': 'none' },
      cursor: 'not-allowed',
      background: calc(vars, 'disabled.background'),
      'border-color': calc(vars, 'disabled.borderColor'),
      'box-shadow': calc(vars, 'disabled.boxShadow'),
    },
    selected: {
      background: calc(vars, 'selected.background', akColorN700),
      color: calc(vars, 'selected.color', akColorN20),
      'box-shadow': calc(vars, 'selected.boxShadow'),
      '&:hover': {
        background: calc(vars, 'selected.hover.background', akColorN700),
        'border-color': calc(vars, 'selected.hover.borderColor'),
        transition: 'none',
      },
    },
    link: {
      background: 'none',
      color: calc(vars, 'link.color', akColorB400),
      transition: 'color 0.1s ease-out',
      'box-shadow': calc(vars, 'link.boxShadow'),
      'border-color': calc(vars, 'link.borderColor'),

      '&:hover': {
        background: 'none',
        color: calc(vars, 'link.hover.color', akColorB300),
        'text-decoration': 'underline',
        'border-color': calc(vars, 'link.hover.borderColor'),
      },

      '&:active': {
        color: calc(vars, 'link.active.color', akColorB300),
        'box-shadow': calc(vars, 'link.active.boxShadow'),
        'text-decoration': 'none',
      },

      '&.disabled': {
        color: calc(vars, 'disabled.color', akColorN40),
        background: 'none',
      },
    },
    compact: {
      height: calc(vars, 'compact.height', `${grid * 3 / em}em`),
      'padding-top': calc(vars, 'compact.paddingTop', `${grid / 3}px`),
      'padding-bottom': calc(vars, 'compact.paddingBottom', `${grid / 3}px`),
    },
  });
