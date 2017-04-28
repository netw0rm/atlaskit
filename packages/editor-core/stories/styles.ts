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
    '& .CodeMirror': {
      height: 'auto',
      border: '1px solid #eee'
    },
    '& .ProseMirror': {
      outline: 'none',
      whiteSpace: 'pre-wrap',
      padding: '12px 20px',

      $nest: {
        '& blockquote': {
          borderLeft: `4px solid ${akColorN40}`,
          color: akColorN300,

          $nest: {
            '&::before, &::after': {
              content: 'none',
            },
            '& > *:last-child': {
              display: `block`,
            }
          }
        },

        // '& pre': {
        //   fontFamily: akEditorCodeFontFamily,
        //   background: akEditorCodeBackground,
        //   padding: akEditorCodeBlockPadding,
        //   borderRadius: akBorderRadius,
        // }
      }
    }
  }
});
