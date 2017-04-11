import {
  akEditorSubtleAccent,
} from '../../styles';
import {
  akBorderRadius,
  akColorN50
} from '@atlaskit/util-shared-styles';
import { style } from 'typestyle';

export const input = style({
  $debugName: 'editor-chrome-collapsed',
  backgroundColor: 'white',
  border: `1px solid ${akEditorSubtleAccent}`,
  borderRadius: akBorderRadius,
  boxSizing: 'border-box',
  height: '40px',
  paddingLeft: '20px',
  paddingRight: '20px',
  width: '100%',

  $nest: {
    '&:hover': {
      borderColor: akColorN50,
      cursor: 'pointer',
    }
  }
});
