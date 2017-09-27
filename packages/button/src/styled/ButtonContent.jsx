import styled from 'styled-components';
import { gridSize, math } from '@atlaskit/theme';

const getAlignment = p => (p.followsIcon ? 'baseline' : 'center');
const getMargin = p => (p.spacing === 'none'
  ? 0
  : `0 ${math.divide(gridSize, 2)(p)}px`
);

const ButtonContent = styled.span`
  align-items: ${getAlignment};
  align-self: ${getAlignment};
  flex: 1 1 auto;
  margin: ${getMargin};
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

ButtonContent.displayName = 'ButtonContent';

export default ButtonContent;
