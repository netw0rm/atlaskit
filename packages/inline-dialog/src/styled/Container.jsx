import styled from 'styled-components';
import {
  akBorderRadius as borderRadius,
  akGridSizeUnitless as spacing,
} from '@atlaskit/util-shared-styles';
import {
  addThemeComponent as registerThemeComponent,
  theme as getTheme,
  themeValue,
} from '../../../theme/src';

const PKG_NM = 'inline-dialog';

registerThemeComponent(PKG_NM, (mode, theme) => (mode === 'dark'
  ? {
    background: theme.colors.DN50,
    shadow: theme.colors.N50A,
    text: theme.colors.text,
  } : {
    background: theme.colors.N0,
    border: theme.colors.N60A,
    shadow: theme.colors.N50A,
    text: theme.colors.text,
  }
));

const getBoxShadow = props => {
  const borderColor = getTheme(props)[PKG_NM].border;
  const shadowColor = getTheme(props)[PKG_NM].shadow;

  const border = borderColor && `0 0 1px ${borderColor}`;
  const shadow = `0 4px 8px -2px ${shadowColor}`;

  return [border, shadow].filter(p => p).join(',');
};

export default styled.div`
  background: ${themeValue(`${PKG_NM}.background`)};
  border-radius: ${borderRadius};
  box-shadow: ${getBoxShadow};
  box-sizing: border-box;
  color: ${themeValue(`${PKG_NM}.text`)};
  max-height: ${spacing * 60}px;
  max-width: ${spacing * 62}px;
  padding: ${spacing * 3}px;
  z-index: 200;
`;
