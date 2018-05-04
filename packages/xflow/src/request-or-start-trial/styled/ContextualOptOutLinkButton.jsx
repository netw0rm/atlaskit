import styled from 'styled-components';

import { colors } from '@atlaskit/theme';

const ContextualOptOutLinkButton = styled.button`
  color: ${colors.B400};
  text-decoration: none;
  border: none;
  font-size: 12px;
  cursor: pointer;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 32px;
  
  &:hover {
    text-decoration: underline;
  }
`;
ContextualOptOutLinkButton.displayName = 'ContextualOptOutLinkButton';
export default ContextualOptOutLinkButton;
