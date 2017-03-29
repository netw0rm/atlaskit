import { style } from 'typestyle';
import {
  akColorB400,
  akColorN20,
  akColorN30,
  akColorN50,
  akColorN500
} from '@atlaskit/util-shared-styles';

export const mention = style({
  background: akColorN30,
  borderRadius: '20px',
  color: akColorN500,
  cursor: 'pointer',
  padding: '0 4px 2px 3px',
  whiteSpace: 'nowrap',
  $nest: {
    '.ProseMirror-selectednode &': {
      background: akColorN50
    }
  }
});

export const highlighted = style({
  background: akColorB400,
  color: akColorN20
});
