import {
  akColorN80,
  akColorN700,
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
    cursor: 'pointer',
  },
  btnPrev: {
    float: 'left',
  },
  btnNext: {
    float: 'right',
  },

  dayOfWeek: {
    color: akColorN80,
    'font-size': '10px',
    'text-transform': 'uppercase',
  },
};
