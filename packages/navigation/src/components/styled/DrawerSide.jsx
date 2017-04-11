import styled from 'styled-components';
import { globalVerticalPaddingTop, globalOpenWidth } from '../../shared-variables';

const DrawerSide = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  padding: ${globalVerticalPaddingTop}px 0 ${globalVerticalPaddingTop * 2}px 0;
  position: relative;
  width: ${globalOpenWidth}px;
`;

DrawerSide.displayName = 'DrawerSide';
export default DrawerSide;
