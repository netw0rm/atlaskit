import { akEditorSubtleAccent } from '../../styles';
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
    '& .ie11': {
      overflow: 'visible',
      wordWrap: 'break-word'
    },

    '.ProseMirror': {
      position: 'relative',
      wordWrap: 'break-word',
      whiteSpace: 'pre-wrap',
      outline: 'none',
      padding: '12px 20px'
    },

    '.ProseMirror ul, .ProseMirror ol': {
      paddingLeft: '30px',
      cursor: 'default'
    },

    '.ProseMirror blockquote': {
      paddingLeft: '1em',
      borderLeft: '3px solid #eee',
      marginLeft: '0',
      marginRight: '0'
    },

    '.ProseMirror pre': {
      whiteSpace: 'pre-wrap'
    },

    '.ProseMirror li': {
      position: 'relative',
      /* Don't do weird stuff with marker clicks */
      pointerEvents: 'none'
    },

    '.ProseMirror li > *': {
      pointerEvents: 'auto'
    },

    '.ProseMirror-hideselection *::selection': {
      $unique: true,
      background: 'transparent'
    },

    '.ProseMirror-hideselection *::-moz-selection': {
      $unique: true,
      background: 'transparent'
    },

    '.ProseMirror-selectednode': {
      outline: 'none',
    },

    /* Make sure li selections wrap around markers */
    'li.ProseMirror-selectednode': {
      outline: 'none'
    },

    'li.ProseMirror-selectednode:after': {
      content: '',
      position: 'absolute',
      left: '-32px',
      right: '-2px',
      top: '-2px',
      bottom: '-2px',
      border: '2px solid #8cf',
      pointerEvents: 'none'
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
  position: 'relative',

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
