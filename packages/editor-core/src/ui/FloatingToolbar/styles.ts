import { akEditorPopupBackground } from 'ak-editor-shared-styles';
import { akBorderRadius } from '@atlaskit/util-shared-styles';
import { style } from 'typestyle';

export const container = style({
  background: akEditorPopupBackground,
  borderRadius: akBorderRadius,
  boxShadow: '0 3px 6px rgba(0, 0, 0, 0.2)',
  zIndex: 1
});
