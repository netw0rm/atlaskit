import * as colors from 'akutil-shared-styles';

const baseFont = 'inherit';
const em = 14;
const grid = 8;
const lineHeight = 20;

const buttonLineHeight = lineHeight / em;
const buttonHeight = `${grid * 4 / em}em`;
const compactButtonHeight = `${grid * 3 / em}em`;

const baseRadius = colors.akBorderRadius;
const sideSlotMargin = `${grid}px`;

// Default Button Colors
const defaultBackgroundColor = colors.akColorN20;
const defaultBackgroundColorHover = colors.akColorN30;
const defaultBackgroundColorFocus = colors.akColorB200;
const defaultBackgroundColorActive = colors.akColorB50;
const defaultColor = colors.akColorN500;

// Primary Button Colors
const primaryBackgroundColor = colors.akColorB400;
const primaryBackgroundColorHover = colors.akColorB500;
const primaryBackgroundColorActive = colors.akColorB300;
const primaryColor = colors.akColorN20;

// Selected Button Colors
const selectedBackgroundColor = colors.akColorN700;
const selectedColor = colors.akColorN20;

// Link Button Colors
const linkColor = colors.akColorB400;
const linkColorHover = colors.akColorB300;
const linkColorActive = linkColorHover;

// Disabled button Colors
const disabledColor = colors.akColorN40;

export default {
  '::slotted([slot="before"])': {
    'margin-right': `${sideSlotMargin}`,
  },
  '::slotted([slot="after"])': {
    'margin-left': `${sideSlotMargin}`,
  },
  ':host .before-slot-wrapper': {
    'align-self': 'center',
    display: 'flex',
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
    background: `${defaultBackgroundColor}`,
    'border-width': '0',
    'border-radius': `${baseRadius}`,
    color: `${defaultColor}`,
    display: 'inline-block',
    'font-style': 'normal',
    'font-size': `${baseFont}`,
    height: `${buttonHeight}`,
    'line-height': `${buttonLineHeight}`,
    margin: '0',
    outline: 'none',
    padding: `${grid * 0.75}px ${grid}px`,
    'text-align': 'center',
    transition: 'background 0.1s ease-out, box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38)',
    'user-select': 'none',

    '&::-moz-focus-inner': {
      margin: 0,
      padding: 0,
      border: 0,
    },

    '&:hover': {
      background: `${defaultBackgroundColorHover}`,
      cursor: 'pointer',
      transition: 'background 0.2s ease-out, box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38)',
    },

    '&:active': {
      background: `${defaultBackgroundColorActive}`,
      'transition-duration': '0s',
    },

    '&:focus': {
      'box-shadow': `0 0 0 2px ${defaultBackgroundColorFocus}`,
      'transition-duration': '0s, 0.2s',
    },
    '&:focus:active': {
      'box-shadow': `0 0 0 0 ${defaultBackgroundColorFocus}`,
    },
  },
  primary: {
    background: `${primaryBackgroundColor}`,
    color: `${primaryColor}`,

    '&:hover': {
      background: `${primaryBackgroundColorHover}`,
    },

    '&:active': {
      background: `${primaryBackgroundColorActive}`,
    },
  },
  subtle: {
    background: 'none',
  },
  disabled: {
    color: `${disabledColor}`,
    '::slotted(*)': { 'pointer-events': 'none' },
    cursor: 'not-allowed',
  },
  selected: {
    background: `${selectedBackgroundColor}`,
    color: `${selectedColor}`,
    '&:hover': {
      background: `${selectedBackgroundColor}`,
      transition: 'none',
    },
  },
  link: {
    background: 'none',
    color: `${linkColor}`,
    transition: 'color 0.1s ease-out',

    '&:hover': {
      background: 'none',
      color: `${linkColorHover}`,
      'text-decoration': 'underline',
    },

    '&:active': {
      color: `${linkColorActive}`,
      'text-decoration': 'none',
    },

    '&.disabled': {
      color: `${disabledColor}`,
      background: 'none',
    },
  },
  compact: {
    height: `${compactButtonHeight}`,
    'padding-top': `${grid / 4}px`,
    'padding-bottom': `${grid / 4}px`,
  },
};
