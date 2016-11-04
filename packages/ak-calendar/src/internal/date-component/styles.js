import {
  akColorN900,
  akColorB75,
  akColorB100,
  akColorN80,
  akColorN400,
  akColorN600,
} from 'akutil-shared-styles';

const akColorWhite = '#fff';

export default {
  day: {
    border: '2px solid transparent',
    'border-radius': '4px',
    cursor: 'pointer',
    display: 'table-cell',
    'font-size': 'inherit',
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
  previouslySelected: {
    'background-color': akColorB75,
    color: akColorN600,
  },
  selected: {
    'background-color': akColorWhite,
    color: akColorN600,
  },
  sibling: {
    color: akColorN80,
  },
  today: {
    'background-color': akColorN900,
    'border-bottom': `1px solid ${akColorB75}`,
    color: akColorB75,
    'font-weight': 'normal',
  },
};
