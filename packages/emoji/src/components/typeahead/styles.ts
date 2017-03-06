import { style } from 'typestyle';
import { akBorderRadius } from '@atlaskit/util-shared-styles';

import {
  emojiPreviewSelectedColor,
  emojiTypeAheadWidth,
  noDialogContainerBorderColor,
  noDialogContainerBorderRadius,
  noDialogContainerBoxShadow,
  scrollableMaxHeight,
} from '../../shared-styles';

export const selected = 'selected';

export const emojiScrollable = style({
  background: 'white',
  border: '1px solid #fff',
  borderRadius: akBorderRadius,
  display: 'block',
  margin: '0',
  maxHeight: scrollableMaxHeight,
  overflowX: 'hidden',
  overflowY: 'auto',
  padding: '0',
});

export const emojiTypeAhead = 'emoji-typeahead';

export const typeAheadListContainer = 'typeahead-list-container';

export const typeAheadList = style({
  border: `1px solid ${noDialogContainerBorderColor}`,
  borderRadius: noDialogContainerBorderRadius,
  boxShadow: noDialogContainerBoxShadow,
  color: '#333',
  width: emojiTypeAheadWidth,
});

export const typeAheadEmpty = style({
  display: 'none',
});

export const typeAheadItem = style({
    cursor: 'pointer',
    display: 'block',
    listStyleType: 'none',
    overflow: 'hidden',

    $nest: {
      [`&.${selected}`]: {
        backgroundColor: emojiPreviewSelectedColor,
      },
    },
});

export const typeAheadItemRow = style({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  verticalAlign: 'middle',
});
