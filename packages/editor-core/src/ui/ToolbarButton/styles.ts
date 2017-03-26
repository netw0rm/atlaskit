import { style } from 'typestyle';

export const button = style({
  lineHeight: 0,

  $nest: {
    '& + &': {
      marginLeft: '4px',
    }
  }
});
