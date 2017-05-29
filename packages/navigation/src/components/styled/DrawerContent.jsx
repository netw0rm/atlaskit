import styled from 'styled-components';
import { layout } from '../../shared-variables';

const DrawerContent = styled.div`
  box-sizing: border-box;
  padding: 0 ${layout.padding.side}px;
  width: 100%;
`;

DrawerContent.displayName = 'DrawerContent';
export default DrawerContent;
