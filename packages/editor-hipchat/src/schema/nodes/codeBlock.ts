import {
  codeBlock as codeBlockBase,
  NodeSpec,
} from '@atlaskit/editor-core';
import { style } from 'typestyle';

import {
  akCodeBorderRadius,
  akEditorCodeBackground,
  akEditorCodeBlockPadding,
  akEditorCodeFontFamily,
} from '../../styles';

const codeBlockStyle = style({
  fontFamily: akEditorCodeFontFamily,
  background: akEditorCodeBackground,
  padding: akEditorCodeBlockPadding,
  borderRadius: akCodeBorderRadius
});

export const codeBlock: NodeSpec = {
  ...codeBlockBase,
  toDOM(node): [string, any, number] {
    return ['pre', { 'data-language': node.attrs.language, 'class': codeBlockStyle }, 0];
  }
};
