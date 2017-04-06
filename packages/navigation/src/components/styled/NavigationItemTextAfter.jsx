import styled from 'styled-components';

const NavigationItemTextAfter = styled.div`
  position: relative;
  z-index: 1;

  [data-__ak-navigation-container-closed="true"] & {
    opacity: 0;
  }
`;

NavigationItemTextAfter.displayName = NavigationItemTextAfter;
export default NavigationItemTextAfter;
