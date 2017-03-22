import { akEditorPopupText } from '../../styles';
import { style } from 'typestyle';

export const input = style({
  $nest: {
    'input&': {
      background: 'transparent',
      border: 0,
      borderRadius: 0,
      boxSizing: 'content-box',
      color: akEditorPopupText,
      flexGrow: 1,
      fontSize: '13px',
      lineHeight: '20px',
      padding: 0,

      // IE11 fixes
      height: '20px',
      minWidth: 145,
    },

    // Hides IE10+ built-in [x] clear input button
    '&::-ms-clear': {
      display: 'none'
    },

    '&:focus': {
      outline: 'none',
    },

    '&::placeholder': {
      color: akEditorPopupText,
      opacity: 0.5,
    }
  }
});
