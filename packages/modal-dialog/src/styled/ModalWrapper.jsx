import styled from 'styled-components';
import { akZIndexBlanket } from '@atlaskit/util-shared-styles';

// Fixed container to avoid position clashing with other elements
export default styled.div`
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: ${akZIndexBlanket};
`;
