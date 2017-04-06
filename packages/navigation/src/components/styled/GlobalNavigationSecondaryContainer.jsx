import styled from 'styled-components';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';

const GlobalNavigationSecondaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: ${akGridSizeUnitless * 2.5}px;
`;

GlobalNavigationSecondaryContainer.displayName = GlobalNavigationSecondaryContainer;
export default GlobalNavigationSecondaryContainer;
