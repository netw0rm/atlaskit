import styled from 'styled-components';
import { layout } from '../../shared-variables';

const DrawerMain = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: ${layout.padding.top}px 0;
  overflow-y: auto;
  width: 100%;
`;

DrawerMain.displayName = 'DrawerMain';
export default DrawerMain;
