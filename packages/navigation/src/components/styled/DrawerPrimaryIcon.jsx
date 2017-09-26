import styled from 'styled-components';
import { colors, themed } from '@atlaskit/theme';
import { drawerBackIconSize } from '../../utils/drawer-style-variables';

const DrawerPrimaryIcon = styled.div`
  align-items: center;
  display: flex;
  height: ${drawerBackIconSize}px;
  justify-content: center;
  width: ${drawerBackIconSize}px;
  color: ${themed({ light: colors.N300, dark: colors.DN300 })};
`;

DrawerPrimaryIcon.displayName = 'DrawerPrimaryIcon';
export default DrawerPrimaryIcon;
