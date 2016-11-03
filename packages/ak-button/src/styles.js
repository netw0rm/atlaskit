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
import { em, grid } from './shared-variables';

const transitionValue = `
  background 0.1s
  ease-out,
  box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38)
`;

export default (vars) => {
  const val = _get.bind(null, vars);
  return {
    // light DOM styles
    ':host': {
      display: 'inline-flex',
    },
    ':host(> _shadow_root_)': {
      display: 'inline-flex',
    },
    ':host([disabled])': {
      'pointer-events': 'none',
    },
    // shadow DOM styles
    '::slotted([slot="before"])': {
      'line-height': '0',
      'margin-right': `${grid}px`,
    },
    '::slotted(:not([slot]))': {
      'line-height': '0',
    },
    '::slotted([slot="after"])': {
      'line-height': '0',
      'margin-left': `${grid}px`,
    },
    'before-slot-wrapper': {
      'align-self': 'center',
      display: 'flex',
    },
    'default-slot-wrapper': {
      display: 'flex',
    },
    'after-slot-wrapper': {
      'align-self': 'center',
      display: 'flex',
    },
    'button-content': {
      'align-items': 'baseline',
      display: 'flex',
      'flex-wrap': 'nowrap',
      'pointer-events': 'none',
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
      background: val('standard.background', akColorN20),
      'border-width': '0',
      'border-radius': val('button.baseRadius', akBorderRadius),
      color: val('standard.color', akColorN500),
      display: 'inline-flex',
      'font-style': 'normal',
      'font-size': 'inherit',
      height: val('button.height', `${(grid * 4) / em}em`),
      'line-height': val('button.lineHeight', `${(grid * 4) / em}em`),
      margin: '0',
      outline: 'none',
      padding: val('button.padding', `${grid * 0.75}px ${grid * 1.5}px`),
      'padding-top': 0,
      'padding-bottom': 0,
      'text-align': 'center',
      transition: val('button.transition', transitionValue),
      'user-select': 'none',
      border: val('button.border', 'none'),
      'vertical-align': 'middle',
      'align-items': 'center',

      '&::-moz-focus-inner': {
        margin: 0,
        padding: 0,
        border: 0,
      },

      '&:hover': {
        background: val('standard.hover.background', akColorN30),
        cursor: 'pointer',
        'border-color': val('standard.hover.borderColor'),
      },

      '&:active': {
        background: val('standard.active.background', akColorB50),
        'box-shadow': val('standard.active.boxShadow'),
        'transition-duration': val('standard.active.transitionDuration', '0s'),
      },

      '&:focus': {
        'box-shadow': `0 0 0 2px ${val('standard.focus.background', akColorB200)}`,
        'transition-duration': val('standard.focus.transitionDuration', '0s, 0.2s'),
      },
    },
    primary: {
      background: val('primary.background', akColorB400),
      color: val('primary.color', akColorN20),
      'border-color': val('primary.borderColor'),
      'font-weight': 600,

      '&:hover': {
        background: val('primary.hover.background', akColorB500),
        'border-color': val('primary.borderColor'),
      },

      '&:active': {
        background: val('primary.active.background', akColorB300),
      },
    },
    subtle: {
      background: 'none',
      color: val('subtle.color'),
      'border-color': val('subtle.borderColor'),
      '&:hover': {
        color: val('subtle.hover.color'),
      },
    },
    disabled: {
      color: val('disabled.color', akColorN40),
      '::slotted(*)': { 'pointer-events': 'none' },
      cursor: 'not-allowed',
      background: val('disabled.background'),
      'border-color': val('disabled.borderColor'),
      'box-shadow': val('disabled.boxShadow'),
    },
    selected: {
      background: val('selected.background', akColorN700),
      color: val('selected.color', akColorN20),
      'box-shadow': val('selected.boxShadow'),
      '&:hover': {
        background: val('selected.hover.background', akColorN700),
        'border-color': val('selected.hover.borderColor'),
        transition: 'none',
      },
    },
    href: {
      'text-decoration': 'none',
    },
    link: {
      background: 'none',
      color: val('link.color', akColorB400),
      transition: 'color 0.1s ease-out',
      'box-shadow': val('link.boxShadow'),
      'border-color': val('link.borderColor'),

      '&:hover': {
        background: 'none',
        color: val('link.hover.color', akColorB300),
        'text-decoration': 'underline',
        'border-color': val('link.hover.borderColor'),
      },

      '&:active': {
        color: val('link.active.color', akColorB300),
        'box-shadow': val('link.active.boxShadow'),
        'text-decoration': 'none',
      },

      '&.disabled': {
        color: val('disabled.color', akColorN40),
        background: 'none',
      },
    },
    compact: {
      height: val('compact.height', `${(grid * 3) / em}em`),
      'line-height': val('compact.lineHeight', `${(grid * 3) / em}em`),
    },
  };
};
