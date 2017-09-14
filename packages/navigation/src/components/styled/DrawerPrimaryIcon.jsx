import styled from 'styled-components';
import { akColorN300 } from '@atlaskit/util-shared-styles';
import { drawerBackIconSize } from '../../utils/drawer-style-variables';

const DrawerPrimaryIcon = styled.div`
  align-items: center;
  display: flex;
  height: ${drawerBackIconSize}px;
  justify-content: center;
  width: ${drawerBackIconSize}px;
  // Drawer colour is always white (not themed) so fixed colour here is fine.
  color: ${akColorN300};
`;

DrawerPrimaryIcon.displayName = 'DrawerPrimaryIcon';
export default DrawerPrimaryIcon;
