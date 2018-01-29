import styled from 'styled-components';

import { colors, gridSize, math } from '@atlaskit/theme';

const CloseModalDialogButton = styled.button`
  @media all and (max-height: 560px) {
    span {
      color: ${colors.N300};
    }
  }
  
  float: right;
  background-color: transparent;
  text-decoration: none;
  border: none;
  margin-right: -${math.multiply(gridSize, 1.5)}px;
  margin-top: ${gridSize}px;
  cursor: pointer;
  
  &:focus {
    outline: 0;
  }
`;
CloseModalDialogButton.displayName = 'CloseModalDialogButton';
export default CloseModalDialogButton;
