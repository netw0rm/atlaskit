import styled from 'styled-components';
import { gridSize, layout } from '../../shared-variables';
import { isElectronMac } from '../../theme/util';

const getWidth = ({ theme }) =>
  (isElectronMac(theme) ? layout.width.closed.electron : layout.width.closed.default);

const DrawerSide = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  padding: ${layout.padding.top + gridSize}px 0;
  position: relative;
  width: ${getWidth}px;
`;

DrawerSide.displayName = 'DrawerSide';
export default DrawerSide;
