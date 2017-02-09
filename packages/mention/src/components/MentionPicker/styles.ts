import { style } from 'typestyle';

import { akColorN100 } from '@atlaskit/util-shared-styles';

import {
  mentionListWidth,
  noDialogContainerBorderColor,
  noDialogContainerBorderRadius,
  noDialogContainerBoxShadow,
} from '../../shared-styles';

export const akMentionPicker = style({
  display: 'block',
});

export const akMentionPickerInfo = style({
  background: '#fff',
  color: akColorN100,
  border: `1px solid ${noDialogContainerBorderColor}`,
  borderRadius: noDialogContainerBorderRadius,
  boxShadow: noDialogContainerBoxShadow,
  display: 'block',
  width: mentionListWidth,
  whiteSpace: 'nowrap',

  $nest: {
    p: {
      margin: 0,
      overflow: 'hidden',
      padding: '9px',
      textOverflow: 'ellipsis',
    },
  },
});
