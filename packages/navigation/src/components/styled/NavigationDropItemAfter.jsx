import styled from 'styled-components';
import NavigationItemAfter from '../styled/NavigationItemAfter';

const NavigationDropItemAfter = styled(NavigationItemAfter)`
  [data-__ak-navigation-container-closed="true"] & {
    display: none;
  }
`;

NavigationDropItemAfter.displayName = 'NavigationDropItemAfter';
export default NavigationDropItemAfter;
