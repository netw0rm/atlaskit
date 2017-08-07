import { colors, themed } from '../../../theme/src';

/**
 * Convert a hex colour code to RGBA.
 * @param {String} hex Hex colour code.
 * @param {Number} alpha Optional alpha value (defaults to 1).
 *
 * @todo Move this to util-shared-styles.
 */
/* eslint-disable no-bitwise */
const hex2rgba = (hex, alpha = 1) => {
  let color;

  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    color = hex.substring(1).split('');

    if (color.length === 3) {
      color = [color[0], color[0], color[1], color[1], color[2], color[2]];
    }

    color = `0x${color.join('')}`;

    const r = (color >> 16) & 255;
    const g = (color >> 8) & 255;
    const b = color & 255;

    return `rgba(${[r, g, b].join(',')}, ${alpha})`;
  }

  throw new Error('Bad Hex');
};
/* eslint-enable no-bitwise */

export default {
  // Fallbacks
  fallbacks: {
    background: themed({ light: colors.N20A, dark: colors.DN70 }),
    color: themed({ light: colors.N400, dark: colors.DN400 }),
    textDecoration: 'none',
  },

  // Themes
  theme: {
    // Default appearance
    default: {
      background: {
        default: themed({ light: colors.N20A, dark: colors.DN70 }),
        hover: themed({ light: colors.N30A, dark: colors.DN60 }),
        active: themed({ light: hex2rgba(colors.B75, 0.6), dark: colors.B75 }),
        disabled: themed({ light: colors.N20A, dark: colors.DN70 }),
        selected: themed({ light: colors.N700, dark: colors.DN0 }),
      },
      boxShadowColor: {
        focus: themed({ light: hex2rgba(colors.B200, 0.6), dark: colors.B75 }),
      },
      color: {
        default: themed({ light: colors.N400, dark: colors.DN400 }),
        active: themed({ light: colors.B400, dark: colors.B400 }),
        disabled: themed({ light: colors.N70, dark: colors.DN30 }),
        selected: themed({ light: colors.N20, dark: colors.DN400 }),
      },
    },

    // Primary appearance
    primary: {
      background: {
        default: themed({ light: colors.B400, dark: colors.B100 }),
        hover: themed({ light: colors.B300, dark: colors.B75 }),
        active: themed({ light: colors.B500, dark: colors.B200 }),
        disabled: themed({ light: colors.N20A, dark: colors.DN70 }),
        selected: themed({ light: colors.N700, dark: colors.DN0 }),
      },
      boxShadowColor: {
        focus: themed({ light: hex2rgba(colors.B200, 0.6), dark: colors.B75 }),
      },
      color: {
        default: themed({ light: colors.N0, dark: colors.DN30 }),
        disabled: themed({ light: colors.N70, dark: colors.DN30 }),
        selected: themed({ light: colors.N20, dark: colors.DN400 }),
      },
    },

    // Link appearance
    link: {
      background: {
        default: themed({ light: 'none', dark: 'none' }),
        selected: themed({ light: colors.N700, dark: colors.N20 }),
      },
      boxShadowColor: {
        focus: themed({ light: hex2rgba(colors.B200, 0.6), dark: colors.B75 }),
      },
      color: {
        default: themed({ light: colors.B400, dark: colors.B75 }),
        hover: themed({ light: colors.B300, dark: colors.B50 }),
        active: themed({ light: colors.B500, dark: colors.B100 }),
        disabled: themed({ light: colors.N70, dark: colors.DN100 }),
        selected: themed({ light: colors.N20, dark: colors.N700 }),
      },
      textDecoration: {
        hover: 'underline',
      },
    },

    // Subtle appearance
    subtle: {
      background: {
        default: themed({ light: 'none', dark: 'none' }),
        hover: themed({ light: colors.N30A, dark: colors.DN60 }),
        active: themed({ light: hex2rgba(colors.B75, 0.6), dark: colors.B75 }),
        disabled: themed({ light: 'none', dark: 'none' }),
        selected: themed({ light: colors.N700, dark: colors.DN0 }),
      },
      boxShadowColor: {
        focus: themed({ light: hex2rgba(colors.B200, 0.6), dark: colors.B75 }),
      },
      color: {
        default: themed({ light: colors.N400, dark: colors.DN400 }),
        active: themed({ light: colors.B400, dark: colors.B400 }),
        disabled: themed({ light: colors.N70, dark: colors.DN100 }),
        selected: themed({ light: colors.N20, dark: colors.DN400 }),
      },
    },

    // Subtle Link appearance
    'subtle-link': {
      background: {
        default: themed({ light: 'none', dark: 'none' }),
        selected: themed({ light: colors.N700, dark: colors.N20 }),
      },
      boxShadowColor: {
        focus: themed({ light: hex2rgba(colors.B200, 0.6), dark: colors.B75 }),
      },
      color: {
        default: themed({ light: colors.N100, dark: colors.DN400 }),
        hover: themed({ light: colors.B300, dark: colors.B50 }),
        active: themed({ light: colors.B500, dark: colors.DN300 }),
        disabled: themed({ light: colors.N70, dark: colors.DN100 }),
        selected: themed({ light: colors.N20, dark: colors.DN400 }),
      },
      textDecoration: {
        hover: 'underline',
      },
    },
  },
};
