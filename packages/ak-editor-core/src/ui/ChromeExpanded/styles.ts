import {
  akEditorCodeBackground,
  akEditorCodeBlockPadding,
  akEditorCodeFontFamily,
  akEditorCodeInlinePadding,
  akEditorSubtleAccent,
} from 'ak-editor-shared-styles';

import {
  akBorderRadius,
  akColorN100,
  akColorN40,
  akColorN50,
  akColorN300,
  akColorN400,
  akGridSize,
} from 'akutil-shared-styles';

import { style } from 'typestyle';

export const container = style({
  backgroundColor: 'white',
  border: `1px solid ${akEditorSubtleAccent}`,
  boxSizing: 'border-box',
  borderRadius: akBorderRadius,

  // Create a stacking context, so that the toolbar can be placed above the content.
  position: 'relative',
});

export const content = style({
  // Place the editor content beneath the toolbar.
  position: 'relative',
  zIndex: 1,

  $nest: {
    '& .ProseMirror-content': {
      outline: 'none',
      whiteSpace: 'pre-wrap',
      padding: '12px 20px',

      $nest: {
        // This needs to be removed once we update specs in ak-style-reset
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

        '& code': {
          fontFamily: akEditorCodeFontFamily,
          background: akEditorCodeBackground,
          padding: akEditorCodeInlinePadding,
          borderRadius: akBorderRadius,
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

export const footer = style({
  fontSize: '14px',
  padding: '20px',
  paddingTop: '10px',
  display: 'flex',
  alignItems: 'center',
  flexGrow: 1,
});

export const footerActions = style({
  display: 'flex',
  flexGrow: 1,
});

export const iconButton = style({
  cursor: 'pointer',
  fontSize: 'inherit',
  background: 'none',
  border: 'none',
  padding: 0,
  marginLeft: '5px',
  marginRight: '5px',
});

export const toolbar = style({
  alignItems: 'center',
  display: 'flex',
  height: '40px',
  paddingLeft: akGridSize,
  paddingRight: akGridSize,
  // Place toolbar content above the content.
  position: 'relative',
  zIndex: 2,

  $nest: {
    '& > *': {
      alignItems: 'center',
      display: 'flex',
      marginLeft: '10px',

      $nest: {
        '&:first-child': {
          marginLeft: 0,
        }
      }
    }
  }
});
