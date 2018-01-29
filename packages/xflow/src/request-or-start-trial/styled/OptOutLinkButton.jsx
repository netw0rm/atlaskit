import styled from 'styled-components';

import { colors } from '@atlaskit/theme';

const OptOutLinkButton = styled.button`
  color: ${colors.B400};
  text-decoration: none;
  border: none;
  font-size: 12px;
  cursor: pointer;
  margin-left: -6px;
  margin-top: 15px;
  
  &:hover {
    text-decoration: underline;
  }
`;
OptOutLinkButton.displayName = 'OptOutLinkButton';
export default OptOutLinkButton;
