import styled from 'styled-components';
import { akGridSizeUnitless, globalItemMediumSize } from '@atlaskit/util-shared-styles';
import { actionsMarginTop } from './GlobalPrimaryActionsPrimaryItem';

const actionsMarginBottom = akGridSizeUnitless * 3.5;

const GlobalPrimaryActionsInner = styled.div`
  box-sizing: border-box;
  height: ${({ isVisible }) => (isVisible ? `${globalItemMediumSize * 3}px + ${actionsMarginTop}px` : 0)};
  margin-bottom: ${actionsMarginBottom}px;
`;

GlobalPrimaryActionsInner.displayName = 'GlobalPrimaryActionsInner';
export default GlobalPrimaryActionsInner;
