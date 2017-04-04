import styled from 'styled-components';
import {
  resizeAnimationTime,
} from '../../shared-variables';

export default styled.div`
  transition: ${({ shouldAnimate }) => (shouldAnimate ? `width ${resizeAnimationTime}` : 'none')};
`;
