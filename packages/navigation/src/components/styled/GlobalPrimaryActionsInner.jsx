import styled from 'styled-components';
import { akGridSizeUnitless, globalItemMediumSize } from '@atlaskit/util-shared-styles';
import { actionsMarginTop } from './GlobalPrimaryActionsPrimaryItem';

const actionsMarginBottom = akGridSizeUnitless * 3.5;

const GlobalPrimaryActionsInner = styled.div`
  box-sizing: border-box;
  height: ${({ isVisible }) => (isVisible ? `${globalItemMediumSize * 3}px + ${actionsMarginTop}px` : 0)};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  transition: height 220ms, margin 220ms, opacity 220ms;
  margin-bottom: ${({ isVisible }) => (isVisible ? `${actionsMarginBottom}px` : 0)};
`;

GlobalPrimaryActionsInner.displayName = GlobalPrimaryActionsInner;
export default GlobalPrimaryActionsInner;
