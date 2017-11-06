import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme';

const CloseModalDialogButton = styled.button`
  float: right;
  background-color: transparent;
  text-decoration: none;
  border: none;
  margin-right: -${gridSize}px;
  margin-top: ${gridSize}px;
  
  &:focus {
    outline: 0;
  }
`;
CloseModalDialogButton.displayName = 'CloseModalDialogButton';
export default CloseModalDialogButton;
