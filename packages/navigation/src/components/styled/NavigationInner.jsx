import styled from 'styled-components';
import { akZIndexNavigation } from '@atlaskit/util-shared-styles';

export default styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  position: fixed;
  left: 0;
  z-index: ${akZIndexNavigation};
`;
