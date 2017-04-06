import styled from 'styled-components';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';

export const actionsMarginTop = akGridSizeUnitless * 2;

const GlobalPrimaryActionsItemsWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: ${actionsMarginTop}px;
`;

GlobalPrimaryActionsItemsWrapper.displayName = 'GlobalPrimaryActionsItemsWrapper';
export default GlobalPrimaryActionsItemsWrapper;
