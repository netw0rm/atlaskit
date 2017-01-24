import { akEditorPopupText } from 'ak-editor-shared-styles';
import { style } from 'typestyle';

export const container = style({
  $nest: {
    '& button > span > span:first-child': {
      color: akEditorPopupText,
      minWidth: '80px',
      textAlign: 'left',
      zIndex: 1
    },
    '& span[role="menuitem"]': {
      padding: '0 16px'
    }
  }
});
