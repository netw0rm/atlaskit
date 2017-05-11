import styled from 'styled-components';

const NavigationItemAfter = styled.div`
  display: block;
  min-width: ${({ shouldTakeSpace }) => (shouldTakeSpace ? '24px' : 0)};
  [data-__ak-navigation-container-closed="true"] & {
      ${({ isDropdownTrigger }) => (isDropdownTrigger ? 'display: none' : '')}
  }
`;

NavigationItemAfter.displayName = 'NavigationItemAfter';
export default NavigationItemAfter;
