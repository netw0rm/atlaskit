const asdf = {
  standard: {
    normal: {
      text: 'colors.N700',
      background: 'colors.N20',
    },
    hover: {
      text: 'colors.N700',
      background: 'colors.N30',
    },
  },
  green: {
    normal: {
      text: 'colors.N800',
      background: 'colors.G200',
    },
    hover: {
      text: 'colors.B400',
      background: 'colors.G100',
    },

  },
  purple: {
    normal: {
      text: 'colors.N800',
      background: 'colors.P100',
    },
    hover: {
      text: 'colors.B400',
      background: 'colors.P75',
    },
  },
  red: {
    normal: {
      text: 'colors.N800',
      background: 'colors.R100',
    },
    hover: {
      text: 'colors.B400',
      background: 'colors.R75',
    },
  },
  yellow: {
    normal: {
      text: 'colors.N800',
      background: 'colors.Y200',
    },
    hover: {
      text: 'colors.B400',
      background: 'colors.Y100',
    },
  },
  grey: {
    normal: {
      text: 'colors.N0',
      background: 'colors.N500',
    },
    hover: {
      text: 'colors.B400',
      background: 'colors.N50',
    },
  },
  teal: {
    normal: {
      text: 'colors.N800',
      background: 'colors.T200',
    },
    hover: {
      text: 'colors.B400',
      background: 'colors.T100',
    },

  },
  blue: {
    normal: {
      text: 'colors.N800',
      background: 'colors.B100',
    },
    hover: {
      text: 'colors.B400',
      background: 'colors.B75',
    },
  },
  tealLight: {
    normal: {
      text: 'colors.N500',
      background: 'colors.T100',
    },
    hover: {
      text: 'colors.B400',
      background: 'colors.T75',
    },
  },
  blueLight: {
    normal: {
      text: 'colors.B500',
      background: 'colors.B75',
    },
    hover: {
      text: 'colors.B400',
      background: 'colors.B50',
    },
  },
  greenLight: {
    normal: {
      text: 'colors.G500',
      background: 'colors.G100',
    },
    hover: {
      text: 'colors.B400',
      background: 'colors.G75',
    },
  },
  purpleLight: {
    normal: {
      text: 'colors.P500',
      background: 'colors.P75',
    },
    hover: {
      text: 'colors.B400',
      background: 'colors.P50',
    },
  },
  redLight: {
    normal: {
      text: 'colors.N500',
      background: 'colors.R75',
    },
    hover: {
      text: 'colors.B400',
      background: 'colors.R50',
    },
  },
  yellowLight: {
    normal: {
      text: 'colors.N500',
      background: 'colors.Y100',
    },
    hover: {
      text: 'colors.B400',
      background: 'colors.Y75',
    },
  },
  greyLight: {
    normal: {
      text: 'colors.N500',
      background: 'colors.N30',
    },
    hover: {
      text: 'colors.B400',
      background: 'colors.N20',
    },
  },
};

const newObj = {
  textColor: {},
  backgroundColor: {},
  textColorHover: {},
  backgroundColorHover: {},
};

Object.keys(asdf).forEach(key => {
  newObj.textColor[key] = { light: asdf[key].normal.text, dark: asdf[key].normal.text };
  newObj.backgroundColor[key] = { light: asdf[key].normal.background, dark: asdf[key].normal.background }
  newObj.textColorHover[key] = { light: asdf[key].hover.text, dark: asdf[key].hover.text }
  newObj.backgroundColorHover[key] = { light: asdf[key].hover.background, dark: asdf[key].hover.background }
});

const code = `
export const textColor = {
  ${Object.keys(asdf).map(key => `
  ${key}: { light: ${asdf[key].normal.text}, dark: ${asdf[key].normal.text} }`)}
};

export const backgroundColor = {
  ${Object.keys(asdf).map(key => `
  ${key}: { light: ${asdf[key].normal.background}, dark: ${asdf[key].normal.background} }`)}
};

export const textColorHover = {
  ${Object.keys(asdf).map(key => `
  ${key}: { light: ${asdf[key].hover.text}, dark: ${asdf[key].hover.text} }`)}
};

export const backgroundColorHover = {
  ${Object.keys(asdf).map(key => `
  ${key}: { light: ${asdf[key].hover.background}, dark: ${asdf[key].hover.background} }`)}
};
`;

console.log(code);
