import { akColorN400, akColorPrimary1, akColorN20 } from 'akutil-shared-styles';
import { style } from 'typestyle';

export const removeButtonWrapperStyle = style({
  borderLeft: `1px solid ${akColorN400}`,
  paddingLeft: '5px',
  marginLeft: '5px',

  $nest: {
    ':hover': {
      background: akColorPrimary1,
      borderRadius: '3px',
      color: akColorN20
    }
  }
});

export const buttonWrapperStyle = style({
  margin: '5px 3px',
  display: 'inline-block',

  $nest: {
    ':hover': {
      background: akColorPrimary1,
      borderRadius: '3px',
      color: akColorN20
    }
  }
});

export const selectedButtonWrapperStyle = style({
  margin: '5px 3px',
  display: 'inline-block',
  background: akColorPrimary1,
  borderRadius: '3px',

  $nest: {
    ' button': {
      background: 'none !important',
    }
  }
});
