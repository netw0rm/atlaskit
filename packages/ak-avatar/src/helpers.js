/* Some constants and helper functions for avatar.
 *  We store them here so that we can share them between the component and the tests without
 *  exposing them as api */

// These will be fetched from shared-styles later and a class will be applied instead
const COLORS = {
  R50: '#FECECD',
  R100: '#FDAFAC',
  R200: '#F48580',
  R300: '#ED5451',
  R400: '#D93A35',
  R500: '#BF2117',

  Y50: '#FFF2BF',
  Y100: '#FFE580',
  Y200: '#FFD740',
  Y300: '#FFC400',
  Y400: '#FFAB00',
  Y500: '#FF991F',

  G50: '#ECFDF4',
  G100: '#78F0B7',
  G200: '#64E6A4',
  G300: '#48CC8C',
  G400: '#2DB07C',
  G500: '#008364',

  B50: '#BFEBFF',
  B100: '#23A9FA',
  B200: '#0091EA',
  B300: '#0074E0',
  B400: '#165ECC',
  B500: '#1251AE',

  P50: '#DEDCF2',
  P100: '#B6AFDB',
  P200: '#8D86BF',
  P300: '#6C64A6',
  P400: '#4B4388',
  P500: '#3E3678',
};

function getInitials(name) {
  if (!name || name.length < 3) {
    return name;
  }
  // if there are not two clear names, just return one initial
  if (name.split(' ').length === 1) {
    return name.substr(0, 1).toUpperCase();
  }
  // otherwise return the first character of the first and last word
  const names = name.split(' ');
  return (names[0].substr(0, 1) + names[names.length - 1].substr(0, 1)).toUpperCase();
}

function getColorForInitials(initials) {
  if (!initials || initials.length < 2) {
    return COLORS.R50;
  }
  const colors = Object.keys(COLORS);
  const idx = (initials.charCodeAt(0) + initials.charCodeAt(1)) % colors.length;

  return COLORS[colors[idx]];
}

export {
  COLORS,
  getInitials,
  getColorForInitials,
};
