import styled from 'styled-components';
import { addThemeComponent, theme as getTheme } from '../../../theme/src';

const PKG_NM = 'badge';

addThemeComponent(PKG_NM, (mode, theme) => {
  const dark = mode === 'dark';
  const { colors } = theme;

  return {
    background: {
      added: colors.G50,
      default: dark ? colors.DN70 : colors.N30,
      important: dark ? colors.DN900 : colors.R300,
      primary: dark ? colors.DN600 : colors.B400,
      removed: colors.R50,
    },
    text: {
      added: colors.G500,
      default: dark ? colors.DN900 : colors.N500,
      important: dark ? colors.DN0 : colors.N0,
      primary: dark ? colors.DN70 : colors.N0,
      removed: colors.R500,
    },
  };
});

const getBackgroundColor = (p) => getTheme(p)[PKG_NM].background[p.appearance];
const getTextColor = (p) => getTheme(p)[PKG_NM].text[p.appearance];

export default styled.div`
  background-color: ${getBackgroundColor};
  border-radius: 2em;
  color: ${getTextColor};
  display: inline-block;
  font-size: 12px;
  font-weight: normal;
  line-height: 1;
  min-width: 1px;
  padding: 0.16666666666667em 0.5em;
  text-align: center;
`;
