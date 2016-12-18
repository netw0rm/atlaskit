import { akEditorPopupBackground } from 'ak-editor-shared-styles';
import { akBorderRadius } from 'akutil-shared-styles';
import { style } from 'typestyle';

export const container = style({
  background: akEditorPopupBackground,
  borderRadius: akBorderRadius,
  boxShadow: '0 3px 6px rgba(0, 0, 0, 0.2)',
  display: 'flex',
  alignItems: 'center',
  padding: '5px 10px',
});
