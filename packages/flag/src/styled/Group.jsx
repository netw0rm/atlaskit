import styled from 'styled-components';
import { akGridSizeUnitless as spacing, akZIndexFlag } from '@atlaskit/util-shared-styles';
import TransitionGroup from 'react-transition-group/TransitionGroup';

export default styled.div`
  bottom: ${spacing * 6}px;
  left: ${spacing * 10}px;
  position: fixed;
  z-index: ${akZIndexFlag};
`;

export const SROnly = styled.h1`
  border: 0;
  clip: rect(1px, 1px, 1px, 1px);
  height: 1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

export const Inner = styled(TransitionGroup)`
  position: relative;
`;
