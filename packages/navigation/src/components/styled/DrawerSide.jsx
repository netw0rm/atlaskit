import styled from 'styled-components';
import { navigation } from '../../shared-variables';

// TODO: WHY IS THIS GLOBAL NAV?
const DrawerSide = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  padding: ${navigation.padding.vertical}px 0;
  position: relative;
  width: ${navigation.width.closed}px;
`;

DrawerSide.displayName = 'DrawerSide';
export default DrawerSide;
