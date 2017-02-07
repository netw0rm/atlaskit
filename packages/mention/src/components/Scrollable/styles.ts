import { style } from 'typestyle';

import { akBorderRadius } from '@atlaskit/util-shared-styles';
import { scrollableMaxHeight } from '../../shared-styles';

export const akScrollable = style({
  display: 'block',
  overflowX: 'hidden',
  overflowY: 'auto',

  padding: 0,
  margin: 0,

  background: 'white',
  maxHeight: scrollableMaxHeight,

  border: '1px solid #fff',
  borderRadius: akBorderRadius,
});
