import styled from 'styled-components';
import { container } from '../../shared-variables';

const DrawerContent = styled.div`
  padding: 0 ${container.padding.side}px;
  width: 100%;
`;

DrawerContent.displayName = 'DrawerContent';
export default DrawerContent;
