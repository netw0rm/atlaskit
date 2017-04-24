import styled from 'styled-components';

const NavigationItemAfter = styled.div`
  display: block;
  min-width: ${({ shouldTakeSpace }) => (shouldTakeSpace ? '24px' : 0)};
`;

NavigationItemAfter.displayName = 'NavigationItemAfter';
export default NavigationItemAfter;
