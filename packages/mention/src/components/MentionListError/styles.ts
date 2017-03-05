import { style } from 'typestyle';

import { akBorderRadius } from '@atlaskit/util-shared-styles';

export const mentionListError = style({
  backgroundColor: '#344563',
  color: '#9ba4b3',

  border: '1px solid #fff',
  borderRadius: akBorderRadius,

  height: '264px',

  $nest: {
    img: {
      opacity: .5,
      paddingTop: '70px',
    },

    p: {
      margin: 0,
      textAlign: 'center',
      fontSize: '14px',
      paddingTop: '20px',
    },
  },
});
