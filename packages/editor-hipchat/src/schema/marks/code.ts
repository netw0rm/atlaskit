import {
  code as codeBase,
  MarkSpec,
} from '@atlaskit/editor-core';
import { style } from 'typestyle';

import {
  akCodeBorderRadius,
  akEditorCodeBackground,
  akEditorCodeFontFamily,
  akEditorCodeInlinePadding,
} from '../../styles';

const codeStyle = style({
  fontFamily: akEditorCodeFontFamily,
  background: akEditorCodeBackground,
  padding: akEditorCodeInlinePadding,
  borderRadius: akCodeBorderRadius
});

export const code: MarkSpec = {
  ...codeBase,
  excludes: 'em strong underline mentionQuery emojiQuery',
  toDOM(): [string, any] {
    return ['span', {
      style: 'font-family: monospace; white-space: pre-wrap;',
      class: codeStyle
    }];
  }
};
