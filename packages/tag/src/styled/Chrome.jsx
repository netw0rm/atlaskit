import styled from 'styled-components';
import {
  akGridSizeUnitless,
  akHelperMixins,
} from '@atlaskit/util-shared-styles';
import { colors } from '@atlaskit/theme';
import { buttonWidthUnitless, borderRadius, tagHeight } from './constants';
import { backgroundColor, backgroundColorHover, textColor, textColorHover } from './theme';

export default styled.span`
  ${akHelperMixins.focusRing.default};
  background-color: ${p => (p.markedForRemoval ? colors.R50 : backgroundColor(p))};
  color: ${p => (p.markedForRemoval ? colors.R500 : textColor(p))};
  border-radius: ${({ isRounded }) => (isRounded ? `${buttonWidthUnitless / 2}px` : borderRadius)};
  cursor: default;
  display: flex;
  height: ${tagHeight};
  line-height: 1;
  margin: ${akGridSizeUnitless / 2}px;
  padding: 0;
  overflow: ${({ isRemoved, isRemoving }) => ((isRemoved || isRemoving) ? 'hidden' : 'initial')};
  &:hover {
    ${akHelperMixins.focusRing.none};
    background-color: ${p => (p.markedForRemoval ? colors.R50 : backgroundColorHover(p))};
    color: ${textColorHover};
  }
`;
