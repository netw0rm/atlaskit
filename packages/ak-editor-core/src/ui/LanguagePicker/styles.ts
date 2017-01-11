import { akEditorPopupText } from 'ak-editor-shared-styles';
import { style } from 'typestyle';

export const container = style({
  $nest: {
    '& button > span': {
      color: akEditorPopupText
    }
  }
});
