import { style } from 'typestyle';

import {
  mentionListWidth,
  noDialogContainerBorderRadius,
  noDialogContainerBoxShadow,
} from '../../shared-styles';

export const akMentionList = style({
  display: 'block',
});

export const list = style({
  width: mentionListWidth,
  color: '#333',

  borderRadius: noDialogContainerBorderRadius,
  boxShadow: noDialogContainerBoxShadow,
});

export const empty = style({
  display: 'none',
});
