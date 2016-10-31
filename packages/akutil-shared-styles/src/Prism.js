export const SWATCH_PRIMARY = 'Primary';
export const SWATCH_SECONDARY = 'Secondary';
export const SWATCH_NEUTRAL = 'N';
export const SWATCH_RED = 'R';
export const SWATCH_TEAL = 'T';
export const SWATCH_PURPLE = 'P';
export const SWATCH_GREEN = 'G';
export const SWATCH_YELLOW = 'Y';
export const SWATCH_BLUE = 'B';

export const tintRgx = /A$/;

const swatchToName = {
  [SWATCH_PRIMARY]: 'Primary',
  [SWATCH_SECONDARY]: 'Secondary',
  [SWATCH_NEUTRAL]: 'Neutral',
  [SWATCH_RED]: 'Red',
  [SWATCH_TEAL]: 'Teal',
  [SWATCH_PURPLE]: 'Purple',
  [SWATCH_GREEN]: 'Green',
  [SWATCH_YELLOW]: 'Yellow',
  [SWATCH_BLUE]: 'Blue',
};

const colorRgx = /^akColor(.+)$/;
const colorRgxSwatchOnly = /^akColor([a-z]+)/i;
const colorRgxNumberOnly = /^akColor(?:[a-z]+?)(\d+.*)$/i;
const colorsSymbol = Symbol('lessVars');

class Prism {

  constructor(lessVars) {
    this[colorsSymbol] = Object.freeze(Object
      .entries(lessVars)
      .filter(([key]) => Prism.isColor(key))
      .reduce((prev, [key, value]) => {
        prev[key] = value;
        return prev;
      }, {}));
  }

  static isColor(variable) {
    return colorRgx.test(variable);
  }

  static isTint(colorName) {
    return tintRgx.test(colorName);
  }

  getColors() {
    return this[colorsSymbol];
  }

  getColorByName(colorName) {
    return this.getColors()[colorName];
  }

  getColorsBySwatch(swatch) {
    const swatchRgx = new RegExp(`^akColor${swatch}\\d+`, 'i');
    const ret = {};
    const colors = this.getColors();
    Object
      .keys(colors)
      .filter(key => swatchRgx.test(key))
      .forEach((key) => {
        ret[key] = colors[key];
      });
    return ret;
  }

  static getNameFromSwatch(swatch) {
    return swatchToName[swatch] || null;
  }

  static getSwatchFromColorName(colorName) {
    if (!Prism.isColor(colorName)) {
      throw new Error(`"${colorName}" is not a color`);
    }

    return colorName.match(colorRgxSwatchOnly)[1];
  }

  static getColorNumberFromColorName(colorName) {
    if (!Prism.isColor(colorName)) {
      throw new Error(`"${colorName}" is not a color`);
    }

    return colorName.match(colorRgxNumberOnly)[1];
  }

  getColorNames(color) {
    const colors = this.getColors();
    return Object
      .entries(colors)
      .filter(([, colorHex]) => (colorHex === color))
      .map(([key]) => key);
  }

}

export default Prism;
