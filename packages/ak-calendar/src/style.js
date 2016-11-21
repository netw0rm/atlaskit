import { style } from 'glamor';
import { akColorN80, akColorN700 } from 'akutil-shared-styles';

const akColorTransparent = 'transparent';
const akColorWhite = '#fff';
const cssPadding = '5px 0 10px 0';

export default function () {
  return {
    btn: style({
      backgroundColor: akColorTransparent,
      border: 'none',
      color: akColorN80,
      cursor: 'pointer',
      padding: cssPadding,
    }),
    btnNext: style({
      float: 'right',
    }),
    btnPrev: style({
      float: 'left',
    }),
    calendar: style({
      backgroundColor: akColorN700,
      color: akColorWhite,
      display: 'inline-block',
      padding: 10,
      textAlign: 'center',
    }),
    dayOfWeek: style({
      color: akColorN80,
      fontSize: 8,
      textTransform: 'uppercase',
    }),
    heading: style({
      display: 'flex',
    }),
    monthAndYear: style({
      color: akColorWhite,
      flexBasis: '100%',
      fontSize: 14,
      padding: cssPadding,
    }),
  };
}
