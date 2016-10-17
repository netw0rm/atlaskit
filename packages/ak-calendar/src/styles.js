import {
  akColorB50,
  akColorB100,
  akColorN80,
  akColorN400,
  akColorN600,
  akColorN700,
  akColorN900,
} from 'akutil-shared-styles';
const akColorWhite = '#fff';

export default {
  ':host': {
    'background-color': akColorN700,
    color: akColorWhite,
    display: 'inline-block',
    padding: '10px',
    'text-align': 'center',
  },

  heading: {
    display: 'flex',
  },
  monthAndYear: {
    color: akColorWhite,
    'flex-basis': '100%',
    'font-size': '16px',
    padding: '5px 0 10px 0',
  },
  btn: {
    'background-color': 'transparent',
    border: 'none',
    color: akColorN80,
  },
  btnPrev: {
    float: 'left',
  },
  btnNext: {
    float: 'right',
  },

  // days
  day: {
    border: '2px solid transparent',
    'border-radius': '4px',
    cursor: 'pointer',
    'font-size': '14px',
    padding: '5px',
    '&:hover': {
      'background-color': akColorN900,
    },
  },
  dayOfWeek: {
    color: akColorN80,
    'font-size': '10px',
    'text-transform': 'uppercase',
  },
  disabled: {
    color: akColorN400,
  },
  focused: {
    'background-color': akColorN900,
    'border-color': akColorB100,
  },
  selected: {
    'background-color': akColorWhite,
    color: akColorN600,
  },
  selecting: {
    'background-color': akColorB50,
    color: akColorN600,
  },
  sibling: {
    color: akColorN80,
  },
  today: {
    color: akColorB50,
  },
};
