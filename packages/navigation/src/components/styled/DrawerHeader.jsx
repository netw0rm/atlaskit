import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';
import styled from 'styled-components';

const DrawerHeader = styled.div`
  min-height: ${akGridSizeUnitless * 7}px;
  padding-top: ${akGridSizeUnitless}px;
`;

DrawerHeader.displayName = DrawerHeader;
export default DrawerHeader;
