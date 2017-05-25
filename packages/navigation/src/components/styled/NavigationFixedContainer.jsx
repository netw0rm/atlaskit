import styled from 'styled-components';
import { akZIndexNavigation } from '@atlaskit/util-shared-styles';

const NavigationFixedContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  position: fixed;
  left: 0;
  /* force this to have the width of the Spacer above */
  width: inherit;
  z-index: ${akZIndexNavigation};
`;

NavigationFixedContainer.displayName = 'NavigationFixedContainer';
export default NavigationFixedContainer;
