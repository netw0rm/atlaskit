import {
  akEditorCodeBackground,
  akEditorCodeBlockPadding,
  akEditorCodeFontFamily,
} from '../src/styles';

import {
  akBorderRadius,
  akColorN40,
  akColorN300,
} from 'akutil-shared-styles';

import { style } from 'typestyle';

export const content = style({
  // Place the editor content beneath the toolbar.
  position: 'relative',
  zIndex: 1,
  padding: 20,

  $nest: {
    '& .ProseMirror': {
      outline: 'none',
      whiteSpace: 'pre-wrap',
      padding: '12px 20px',

      $nest: {
        '& blockquote': {
          paddingLeft: '16px',
          borderLeft: `4px solid ${akColorN40}`,
          marginLeft: 0,
          marginRight: 0,
          color: akColorN300,

          $nest: {
            '&::before, &::after': {
              content: '',
            }
          }
        },

        '& pre': {
          fontFamily: akEditorCodeFontFamily,
          background: akEditorCodeBackground,
          padding: akEditorCodeBlockPadding,
          borderRadius: akBorderRadius,
        }
      }
    }
  }
});
