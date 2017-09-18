import { Mark, MarkSpec } from '../../prosemirror';
import {
  akColorG300, akColorN80, akColorP300, akColorR300, akColorT300, akColorY400,
} from '@atlaskit/util-shared-styles';
import { COLOR } from '../groups';

export interface Attributes {
  /**
   * @pattern "^#[0-9a-f]{6}$"
   */
  color: string;
}

/**
 * @name textColor_mark
 */
export interface Definition {
  type: 'textColor';
  attrs: Attributes;
}

export interface TextColorMark extends Mark {
  attrs: Attributes;
}

const rgbToHex = (value: string): string | undefined => {
  const matches = value.match(/(0?\.?\d{1,3})%?\b/g);
  if (matches && matches.length >= 3) {
    const [red, green, blue] = matches.map(Number);
    // tslint:disable-next-line:no-bitwise
    return '#' + ((blue | green << 8 | red << 16) | 1 << 24).toString(16).slice(1);
  }
};

// @see https://product-fabric.atlassian.net/wiki/spaces/E/pages/55979455/Colour+picker+decisions#Colourpickerdecisions-Visualdesigndecisions
export const colorPalette = new Map<string, string>();
[
  // [akColorN800, default],
  [akColorN80, 'Light grey'],
  [akColorP300, 'Purple'],
  [akColorT300, 'Teal'],
  [akColorG300, 'Green'],
  [akColorR300, 'Red'],
  [akColorY400, 'Orange'],
].forEach(([color, label]) => colorPalette.set(color.toLowerCase(), label));

export const textColor: MarkSpec = {
  attrs: { color: { } },
  inclusive: true,
  group: COLOR,
  parseDOM: [
    {
      style: 'color',
      getAttrs: (value: string) => {
        let hexColor;
        if (value.match(/^rgb/i)) {
          hexColor = rgbToHex(value);
        }
        else if (value[0] === '#') {
          hexColor = value.toLowerCase();
        }
        // else handle other colour formats
        return colorPalette.has(hexColor) ? { color: hexColor } : false;
      }
    }
  ],
  toDOM(mark: TextColorMark): [string, object] {
    return ['span', {
      style: `color: ${mark.attrs.color}`
    }];
  }
};
