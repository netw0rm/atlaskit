import {
  theme as getTheme,
  addThemeComponent as registerThemeComponent,
} from '../../theme/src';
import { DEFAULT_APPEARANCE } from './components/Flag';

const COMPONENT_NAME = 'flag';
const lightButtonBackground = 'rgba(255, 255, 255, 0.08)';

registerThemeComponent(COMPONENT_NAME, (mode, theme) => (mode === 'dark'
? {
  error: {
    background: theme.colors.R300,
    buttonBackground: theme.colors.N30A,
    buttonText: theme.colors.DN40,
    focusRingColor: theme.colors.N40,
    text: theme.colors.DN40,
    shadow: theme.colors.N50A,
  },
  info: {
    background: theme.colors.N500,
    buttonBackground: lightButtonBackground,
    buttonText: theme.colors.DN600,
    focusRingColor: theme.colors.N40,
    text: theme.colors.DN600,
    shadow: theme.colors.N50A,
  },
  normal: {
    background: theme.colors.DN50,
    buttonBackground: 'none',
    buttonText: theme.colors.link,
    focusRingColor: theme.colors.link,
    text: theme.colors.DN600,
    shadow: theme.colors.N50A,
  },
  success: {
    background: theme.colors.G300,
    buttonBackground: theme.colors.N30A,
    buttonText: theme.colors.DN40,
    focusRingColor: theme.colors.N40,
    text: theme.colors.DN40,
    shadow: theme.colors.N50A,
  },
  warning: {
    background: theme.colors.Y300,
    buttonBackground: theme.colors.N30A,
    buttonText: theme.colors.DN40,
    focusRingColor: theme.colors.N200,
    text: theme.colors.DN40,
    shadow: theme.colors.N50A,
  },
} : {
  error: {
    background: theme.colors.R400,
    buttonBackground: lightButtonBackground,
    buttonText: theme.colors.N0,
    focusRingColor: theme.colors.N40,
    text: theme.colors.N0,
    shadow: theme.colors.N50A,
  },
  info: {
    background: theme.colors.N500,
    buttonBackground: lightButtonBackground,
    buttonText: theme.colors.N0,
    focusRingColor: theme.colors.N40,
    text: theme.colors.N0,
    shadow: theme.colors.N50A,
  },
  normal: {
    background: theme.colors.N0,
    border: theme.colors.N60A,
    buttonBackground: 'none',
    buttonText: theme.colors.link,
    focusRingColor: theme.colors.B100,
    text: theme.colors.N500,
    shadow: theme.colors.N50A,
  },
  success: {
    background: theme.colors.G400,
    buttonBackground: lightButtonBackground,
    buttonText: theme.colors.N0,
    focusRingColor: theme.colors.N40,
    text: theme.colors.N0,
    shadow: theme.colors.N50A,
  },
  warning: {
    background: theme.colors.Y200,
    buttonBackground: theme.colors.N30A,
    buttonText: theme.colors.N700,
    focusRingColor: theme.colors.N200,
    text: theme.colors.N700,
    shadow: theme.colors.N50A,
  },
}));

// eslint-disable-next-line import/prefer-default-export
export function getProperty(property, props) {
  const appearance = props.appearance || DEFAULT_APPEARANCE;
  const flagTheme = getTheme(props).flag;
  const isDev = process.env.NODE_ENV !== 'production';

  if (!flagTheme[appearance] || !flagTheme[appearance][property]) {
    // eslint-disable-next-line no-console
    if (isDev) console.error(`No matching property "${property}" for appearance "${appearance}"`);

    return undefined;
  }
  return flagTheme[appearance][property];
}
