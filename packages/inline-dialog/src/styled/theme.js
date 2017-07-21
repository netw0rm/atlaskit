import {
  akColorN0,
  akColorN50A,
  akColorN60A,
  akColorN800,
} from '@atlaskit/util-shared-styles';

// NOTE: temp colour declaration
// dark colour palette hasn't made it into `util-shared-styles` yet
const akColorDN50 = '#283447';
const akColorDN600 = '#B8C7E0';

export default {
  light: {
    background: akColorN0,
    border: akColorN60A,
    shadow: akColorN50A,
    text: akColorN800,
  },
  dark: {
    background: akColorDN50,
    shadow: akColorN50A,
    text: akColorDN600,
  },
};
