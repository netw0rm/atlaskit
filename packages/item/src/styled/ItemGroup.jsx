// @flow

import styled, { css } from 'styled-components';
import { getThemeStyle, themeNamespace, smallFontSize } from '../util/theme';

const getPadding = ({ isCompact, theme }): Array<any> => {
  const paddingType = isCompact ? 'compact' : 'default';
  const { x, y } = getThemeStyle(theme[themeNamespace], paddingType, 'padding');
  return css`
    padding: ${y}px ${x}px;
  `;
};

// eslint-disable-next-line import/prefer-default-export
export const GroupTitle = styled.div`
  color: ${({ theme }) => getThemeStyle(theme[themeNamespace], 'secondaryText', 'default')};
  display: flex;
  flex: 1 1 auto;
  ${getPadding}
`;

export const GroupTitleAfter = styled.div`
  flex: 0 0 auto;
`;

export const GroupTitleText = styled.div`
  flex: 1 1 auto;
  font-size: ${smallFontSize}px;
  line-height: 1;
  text-transform: uppercase;
`;
