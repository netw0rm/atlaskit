import styled from 'styled-components';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';

const NavigationItemGroupAction = styled.div`
  margin-right: ${akGridSizeUnitless}px;

  [data-__ak-navigation-container-closed="true"] & {
    visibility: hidden;
  }
`;

NavigationItemGroupAction.displayName = 'NavigationItemGroupAction';
export default NavigationItemGroupAction;
