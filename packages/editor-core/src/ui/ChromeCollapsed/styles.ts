import {
  akEditorSubtleAccent,
} from 'ak-editor-shared-styles';
import {
  akBorderRadius,
  akColorN100,
  akColorN400,
  akColorN50
} from '@atlaskit/util-shared-styles';
import { style } from 'typestyle';

export const input = style({
  backgroundColor: 'white',
  border: `1px solid ${akEditorSubtleAccent}`,
  borderRadius: akBorderRadius,
  boxSizing: 'border-box',
  fontSize: '14px',
  height: '40px',
  paddingLeft: '20px',
  paddingRight: '20px',
  width: '100%',

  $nest: {
    '&::placeholder': {
      color: akColorN100,
    },

    '&:hover': {
      borderColor: akColorN50,
      cursor: 'pointer',

      $nest: {
        '&::placeholder': {
          color: akColorN400,
        }
      }
    }
  }
});
