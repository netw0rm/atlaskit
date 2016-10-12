import merge from 'lodash.merge';
import {
  akBorderRadius,
  akColorN20,
  akColorN30,
  akColorB200,
  akColorB50,
  akColorN500,
  akColorB400,
  akColorB500,
  akColorB300,
  akColorN700,
  akColorN40,
} from 'akutil-shared-styles';

export default themeProps => {
  const lineHeight = themeProps.lineHeight || 20;
  const em = themeProps.em || 14;
  const grid = themeProps.grid || 8;

  const vars = {
    baseFont: 'inherit',
    sideSlotMargin: `${grid}px`,
    button: {
      lineHeight: lineHeight / em,
      height: `${grid * 4 / em}em`,
      baseRadius: akBorderRadius,
      padding: `${grid * 0.75}px ${grid}px`,
      border: 'none',
      transition: 'background 0.1s ease-out, box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38)',

      standard: {
        color: akColorN500,
        background: akColorN20,
        hover: {
          background: akColorN30,
        },
        focus: {
          background: akColorB200,
          transitionDuration: '0s, 0.2s',
        },
        active: {
          background: akColorB50,
          transitionDuration: '0s',
        },
      },

      primary: {
        color: akColorN20,
        background: akColorB400,
        hover: {
          background: akColorB500,
        },
        active: {
          background: akColorB300,
        },
      },
      subtle: {
        hover: {},
      },
      selected: {
        background: akColorN700,
        color: akColorN20,
        hover: {
          background: akColorN700,
        },
      },

      link: {
        color: akColorB400,
        hover: {
          color: akColorB300,
        },
        active: {
          color: akColorB300,
        },
      },

      disabled: {
        color: akColorN40,
      },

      compact: {
        height: `${grid * 3 / em}em`,
        paddingTop: `${grid / 3}px`,
        paddingBottom: `${grid / 3}px`,
      },
    },
  };
  const themeVars = themeProps || {};
  return merge({}, vars, themeVars);
};
