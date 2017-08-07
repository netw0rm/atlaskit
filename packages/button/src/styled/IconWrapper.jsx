import styled from 'styled-components';
import { gridSize, math } from '../../../theme/src';

const getMargin = ({ isOnlyChild, spacing, ...rest }) => {
  if (spacing === 'none') return 0;
  if (isOnlyChild) return `0 -${math.divide(gridSize, 4)(rest)}px`;

  return `0 ${math.divide(gridSize, 2)(rest)}px`;
};

const IconWrapper = styled.span`
  align-self: center;
  display: flex;
  line-height: 0;
  font-size: 0;
  margin: ${getMargin};
`;

IconWrapper.displayName = 'IconWrapper';

export default IconWrapper;
