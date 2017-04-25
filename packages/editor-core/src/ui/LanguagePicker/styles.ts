import { akEditorPopupText } from '../../styles';
import { style } from 'typestyle';

export const container = style({
  $nest: {
    '& button > span > span:first-child': {
      color: akEditorPopupText,
      minWidth: '80px',
      textAlign: 'left'
    },
    '& span[role="menuitem"]': {
      padding: '0 16px'
    }
  }
});

export const floatingToolbar = style({
  backgroundColor: 'transparent',
});
