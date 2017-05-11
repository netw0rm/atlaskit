import styled from 'styled-components';
import NavigationItemIcon from '../styled/NavigationItemIcon';

const NavigationDropItemIcon = styled(NavigationItemIcon)`
  padding-right: 0px;

  [data-__ak-navigation-container-closed="true"] & {
    display: none;
  }
`;

NavigationDropItemIcon.displayName = 'NavigationDropItemIcon';
export default NavigationDropItemIcon;

