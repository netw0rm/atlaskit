/**
 * Converts hex color format to rgba.
 * Works well with full hex color format and shortcut as well.
 *
 * @param hex - hex color string (#xxx, or #xxxxxx)
 */
export function hexToRgb(hex: string): string | null {
  const isHexColor = /^#([A-Fa-f0-9]{3}){1,2}$/.test(hex);
  if (!isHexColor) {
    return null;
  }
  let colorBits = hex.substring(1).split('');
  if(colorBits.length === 3){
    colorBits = [colorBits[0], colorBits[0], colorBits[1], colorBits[1], colorBits[2], colorBits[2]];
  }
  const color = Number(`0x${colorBits.join('')}`);
  // tslint:disable-next-line:no-bitwise
  return `rgb(${(color >> 16) & 255},${(color >> 8) & 255},${color & 255})`;
}


export function rgbToHex(value: string): string | undefined {
  const matches = value.match(/(0?\.?\d{1,3})%?\b/g);
  if (matches && matches.length >= 3) {
    const [red, green, blue] = matches.map(Number);
    // tslint:disable-next-line:no-bitwise
    return '#' + ((blue | green << 8 | red << 16) | 1 << 24).toString(16).slice(1);
  }
}

export function isRGB(value: string): boolean {
  return value.indexOf('rgb(') === 0;
}
