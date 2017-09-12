// @flow
import styled from 'styled-components';
import { getProvided, whenNotCollapsed } from '../../theme/util';
import { scrollbar, scrollHintSpacing, scrollHintHeight } from '../../shared-variables';

const doubleIfNotWebkit = (width) => (
  width * (window.navigator.userAgent.indexOf('AppleWebKit') >= 0 ? 1 : 2)
);

const ContainerNavigationChildrenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
  overflow: hidden;
  position: relative;

  ${whenNotCollapsed`
    &:before,
    &:after {
      background: ${({ theme }) => getProvided(theme).keyline};
      display: block;
      flex: 0;
      height: ${scrollHintHeight}px;
      left: ${scrollHintSpacing}px;
      position: absolute;
      z-index: 1;

      // Because we are using a custom scrollbar for WebKit in ScrollHintScrollContainer, the
      // right margin needs to be calculated based on whether that feature is in use.
      right: ${scrollHintSpacing + doubleIfNotWebkit(scrollbar.size)}px;
    }

    &:before {
      top: 0;
      content: ${({ hasScrollHintTop }) => (hasScrollHintTop ? '\'\'' : 'none')};
    }

    &:after {
      bottom: 0;
      content: ${({ hasScrollHintBottom }) => (hasScrollHintBottom ? '\'\'' : 'none')};
    }
  `}
`;
ContainerNavigationChildrenWrapper.displayName = 'ContainerNavigationChildrenWrapper';
export default ContainerNavigationChildrenWrapper;
