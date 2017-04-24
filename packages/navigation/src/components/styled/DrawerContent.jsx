import styled from 'styled-components';
import { containerNav } from '../../shared-variables';

const DrawerContent = styled.div`
  padding: 0 ${containerNav.padding.horizontal}px;
  width: 100%;
`;

DrawerContent.displayName = 'DrawerContent';
export default DrawerContent;
