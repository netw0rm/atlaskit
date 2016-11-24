import { style } from 'glamor';
import { akColorN0, akColorN80, akColorN700 } from 'akutil-shared-styles';

export default function () {
  return {
    calendar: style({
      display: 'inline-block',
      margin: 0,
      textAlign: 'center',
    }),
    dayOfWeek: style({
      color: akColorN80,
      fontSize: 8,
      textTransform: 'uppercase',
    }),
    heading: style({
      alignItems: 'baseline',
      display: 'flex',
      padding: '4px 0 8px 0',
    }),
    monthAndYear: style({
      color: akColorN0,
      flexBasis: '100%',
      textAlign: 'center',
    }),
    wrapper: style({
      backgroundColor: akColorN700,
      color: akColorN0,
      display: 'inline-block',
      padding: 10,
      userSelect: 'none',
    }),
  };
}
