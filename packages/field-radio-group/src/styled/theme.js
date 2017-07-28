import {
    akColorB100,
    akColorB400,
    akColorB500,
    akColorN20,
    akColorN30A,
    akColorN70,
    akColorN40,
} from '@atlaskit/util-shared-styles';

export default {
  default: {
    background: {
      default: akColorN20,
      focus: akColorN20,
      hover: akColorN40,
    },
    border: {
      default: akColorN30A,
      focus: akColorB100,
      hover: akColorN70,
    },
  },
  selected: {
    background: {
      default: akColorB400,
      focus: akColorB400,
      hover: akColorB500,
    },
    border: {
      default: akColorB400,
      focus: akColorB100,
      hover: akColorB500,
    },
  },
};
