import styled from 'styled-components';

import { colors } from '@atlaskit/theme';

const OptOutLinkButton = styled.button`
  color: ${colors.B400};
  text-decoration: none;
  border: none;
  font-size: 12px;
  cursor: pointer;
  margin-bottom: 32px;
  
  &:hover {
    text-decoration: underline;
  }
`;
OptOutLinkButton.displayName = 'OptOutLinkButton';
export default OptOutLinkButton;
