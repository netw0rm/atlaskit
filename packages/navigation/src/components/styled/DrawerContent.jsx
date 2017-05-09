import styled from 'styled-components';
import { layout } from '../../shared-variables';

const DrawerContent = styled.div`
  padding: 0 ${layout.padding.side}px;
  width: 100%;
`;

DrawerContent.displayName = 'DrawerContent';
export default DrawerContent;
