import styled from 'styled-components';
import { gridSize } from '../../shared-variables';

const NavigationItemGroupAction = styled.div`
  margin-right: ${gridSize}px;

  [data-__ak-navigation-container-closed="true"] & {
    visibility: hidden;
  }
`;

NavigationItemGroupAction.displayName = 'NavigationItemGroupAction';
export default NavigationItemGroupAction;
