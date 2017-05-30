import styled from 'styled-components';
import { globalItemSizes } from '../../shared-variables';

const GlobalNavigationSecondaryContainer = styled.div`
  /* required to keep the secondary actions at the bottom */
  flex-grow: 0;

  /* Required to fix dropdowns in Safari. Won't be needed once layering is changed */
  width: ${globalItemSizes.small};
`;

GlobalNavigationSecondaryContainer.displayName = 'GlobalNavigationSecondaryContainer';
export default GlobalNavigationSecondaryContainer;
