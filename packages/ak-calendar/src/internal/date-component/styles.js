import {
  akColorN900,
  akColorB50,
  akColorB100,
  akColorN80,
  akColorN400,
  akColorN600,
} from 'akutil-shared-styles';

const akColorWhite = '#fff';

export default {
  ':host': {
    display: 'table-cell',
    'font-size': 'inherit',
  },
  day: {
    border: '2px solid transparent',
    'border-radius': '4px',
    cursor: 'pointer',
    'font-weight': 'lighter',
    padding: '5px',
    '&:hover': {
      'background-color': akColorN900,
    },
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
    'background-color': akColorN900,
    'border-bottom': `1px solid ${akColorB50}`,
    color: akColorB50,
    'font-weight': 'normal',
  },
};
