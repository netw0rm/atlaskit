// @flow
import styled from 'styled-components';
import { getProvided } from '../../theme/util';

const ContainerNavigationChildrenWrapper = styled.div`
  flex: 1 1 100%;
  overflow: hidden;
  position: relative;

  &:before,
  &:after {
    background: ${({ theme }) => getProvided(theme).keyline};
    position: absolute;
    height: 2px;
    width: 100%;
    z-index: 1;
  }

  &:before {
    top: 0;
    content: ${({ hasScrollHintTop }) => (hasScrollHintTop ? '\'\'' : 'none')};
  }

  &:after {
    bottom: 0;
    content: ${({ hasScrollHintBottom }) => (hasScrollHintBottom ? '\'\'' : 'none')};
  }
`;
ContainerNavigationChildrenWrapper.displayName = 'ContainerNavigationChildrenWrapper';
export default ContainerNavigationChildrenWrapper;
