import styled from 'styled-components';
import { gridSize } from '../../shared-variables';

const NavigationItemAction = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  position: absolute;
  right: ${gridSize}px;
  top: 0;

  [data-__ak-navigation-container-closed="true"] & {
    opacity: 0;
  }
`;

NavigationItemAction.displayName = 'NavigationItemAction';
export default NavigationItemAction;
