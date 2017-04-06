import styled from 'styled-components';
import { resizeAnimationTime } from '../../shared-variables';

const ContainerNavigationOuter = styled.div`
  height: 100%;
  position: fixed;
  transition: ${({ shouldAnimate }) => (shouldAnimate ? ` width ${resizeAnimationTime}, transform ${resizeAnimationTime}` : 'none')};
`;

ContainerNavigationOuter.defaultProps = {
  shouldAnimate: true,
};

ContainerNavigationOuter.displayName = 'ContainerNavigationOuter';
export default ContainerNavigationOuter;
