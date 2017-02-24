import { akEditorSubtleAccent } from 'ak-editor-shared-styles';
import { akBorderRadius, akGridSize } from '@atlaskit/util-shared-styles';
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
  position: 'relative',

  $nest: {
    '& .ProseMirror-content': {
      outline: 'none',
      whiteSpace: 'pre-wrap',
      padding: '12px 20px',
    },
    '& .ie11': {
      overflow: 'visible',
      wordWrap: 'break-word'
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
