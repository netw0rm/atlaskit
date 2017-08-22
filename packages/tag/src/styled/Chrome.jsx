import styled from 'styled-components';
import {
  akGridSizeUnitless,
  akHelperMixins,
} from '@atlaskit/util-shared-styles';
import { colors, themed } from '@atlaskit/theme';
import { buttonWidthUnitless, borderRadius, tagHeight } from './constants';
import { backgroundColor, backgroundColorHover, textColor, textColorHover } from './theme';

const colorRemoval = themed({ light: colors.R500, dark: colors.DN30 });
const colorRemovalHover = themed({ light: colors.N700, dark: colors.DN30 });
const backgroundColorRemoval = themed({ light: colors.R50, dark: colors.R100 });
export default styled.span`
  ${akHelperMixins.focusRing.default};
  background-color: ${p => (p.markedForRemoval ? backgroundColorRemoval(p) : backgroundColor(p))};
  color: ${p => (p.markedForRemoval ? colorRemoval(p) : textColor(p))};
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
    background-color: ${p => (p.markedForRemoval ? backgroundColorRemoval(p) : backgroundColorHover(p))};
    color: ${p => (p.markedForRemoval ? colorRemovalHover(p) : textColorHover(p))};
  }
`;
