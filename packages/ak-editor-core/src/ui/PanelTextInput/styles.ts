import { akEditorPopupText } from 'ak-editor-shared-styles';
import { style } from 'typestyle';

export const input = style({
  background: 'transparent',
  border: 0,
  color: akEditorPopupText,
  flexGrow: 1,
  fontSize: '13px',
  lineHeight: '20px',

  $nest: {
    '&:focus': {
      outline: 'none',
    },

    '&::placeholder': {
      color: akEditorPopupText,
      opacity: 0.5,
    }
  }
});
