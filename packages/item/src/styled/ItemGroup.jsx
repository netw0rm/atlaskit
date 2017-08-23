// @flow

import styled, { css } from 'styled-components';
import { getThemeStyle, gridSize, smallFontSize, themeNamespace } from '../util/theme';

const getPadding = ({ isCompact, theme }): Array<any> => {
  const paddingType = isCompact ? 'compact' : 'default';
  const { x, y } = getThemeStyle(theme[themeNamespace], paddingType, 'padding');
  return css`
    padding: ${y}px ${x}px;
  `;
};

// eslint-disable-next-line import/prefer-default-export
const GroupTitle = styled.div`
  align-items: center;
  color: ${({ theme }) => getThemeStyle(theme[themeNamespace], 'secondaryText', 'default')};
  display: flex;
  flex: 1 1 auto;
  ${getPadding}
`;
GroupTitle.displayName = 'ItemGroupTitle';

const GroupTitleAfter = styled.div`
  flex: 0 0 auto;
  margin-right: -${gridSize}px;
`;
GroupTitleAfter.displayName = 'ItemGroupTitleAfter';

const GroupTitleText = styled.div`
  flex: 1 1 auto;
  font-size: ${smallFontSize}px;
  line-height: 1;
  text-transform: uppercase;
  /* Required for children to truncate */
  min-width: 0;
`;
GroupTitleText.displayName = 'ItemGroupTitleText';

export {
  GroupTitle,
  GroupTitleAfter,
  GroupTitleText,
};
